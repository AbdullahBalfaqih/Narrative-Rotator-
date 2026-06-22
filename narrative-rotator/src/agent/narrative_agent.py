import yaml
import os
import time
from src.utils.logger import logger

class NarrativeRotatorAgent:
    def __init__(self, tracker, decision_engine, portfolio_manager, executor, bnb_sdk=None):
        self.tracker = tracker
        self.decision = decision_engine
        self.portfolio = portfolio_manager
        self.executor = executor
        self.bnb_sdk = bnb_sdk
        self.sectors_config = {}
        self._peak_value = 0.0
        self._trough_value = float('inf')
        self._current_drawdown = 0.0
        self.load_sectors()

    def load_sectors(self):
        config_path = "config/sectors.yaml"
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
                self.sectors_config = config.get("sectors", {})
                logger.info("Agent: Sectors configuration loaded successfully.")
        else:
            logger.warning("sectors.yaml not found. Using default mock sectors.")
            self.sectors_config = {
                "AI": {"tokens": ["FET"]},
                "DeFi": {"tokens": ["AAVE", "CAKE"]},
                "Meme": {"tokens": ["FLOKI"]},
            }

    def get_current_drawdown(self):
        return self._current_drawdown

    def run_one_cycle(self, dry_run=False):
        logger.info("--- Starting Autonomous Rotation Cycle ---")
        
        self.portfolio.update_portfolio_valuation(self.sectors_config)
        current_value = self.portfolio.get_total_usd_value()
        current_allocation = self.portfolio.get_current_allocation_percentages()
        logger.info(f"Current Portfolio Valuation: ${current_value:.2f} USD")
        logger.info(f"Current Allocations: {current_allocation}")

        # Halt trading if BNB gas is too low
        bnb_balance = self.portfolio.bnb_balance
        if bnb_balance < 0.003:
            logger.warning(f"BNB gas too low ({bnb_balance:.5f} BNB). Skipping cycle to preserve gas.")
            return False, []

        # Track drawdown
        if current_value > self._peak_value:
            self._peak_value = current_value
            self._trough_value = current_value
        else:
            self._trough_value = min(self._trough_value, current_value)
        if self._peak_value > 0:
            self._current_drawdown = round((self._peak_value - self._trough_value) / self._peak_value * 100, 1)
        logger.info(f"Peak: ${self._peak_value:.2f}, Trough: ${self._trough_value:.2f}, Drawdown: {self._current_drawdown}%")

        sector_heats = self.tracker.track_all_sectors(self.sectors_config)
        logger.info(f"Active Sector heats: {sector_heats}")

        target_allocation = self.decision.calculate_target_allocations(
            sector_heats, current_allocation, self._current_drawdown
        )

        trigger_diff = self.tracker.thresholds.get("rotation_trigger_heat_diff", 15.0) / 100.0
        
        proposals = []
        has_rotated = False
        for sector, target_pct in target_allocation.items():
            current_pct = current_allocation.get(sector, 0.0)
            diff = target_pct - current_pct
            
            if abs(diff) > trigger_diff:
                stable = self.sectors_config[sector].get("primary_stable", "USDC")
                target_token = self.sectors_config[sector]["tokens"][0]
                amount_usd = abs(diff) * current_value
                is_buy = diff > 0
                # Cap amount to available stablecoin balance
                stable_balance = self.portfolio.holdings.get(stable, 0)
                stable_price = self.portfolio.token_prices.get(stable, 1)
                available_stable = stable_balance * stable_price
                remaining_buys = max(1, sum(1 for s, tp in target_allocation.items() if tp - current_allocation.get(s, 0) > 0))
                buy_cap = available_stable / remaining_buys if is_buy else float('inf')
                amount_usd = min(amount_usd, buy_cap, 0.25)
                if amount_usd < 0.01:
                    continue
                
                proposal = {
                    "token": target_token,
                    "sector": sector,
                    "stable": stable,
                    "amount_usd": round(amount_usd, 2),
                    "diff_pct": round(diff * 100, 1),
                    "is_buy": is_buy,
                    "reason": f"{sector} heat shifted by {abs(diff)*100:.1f}% vs target"
                }
                
                if dry_run:
                    logger.info(f"  [DRY RUN] Would {'buy' if is_buy else 'sell'} {target_token} ({amount_usd:.2f} USD)")
                    proposals.append(proposal)
                else:
                    if is_buy:
                        logger.info(f"Target shift detected for sector {sector} (+{diff*100:.1f}%). Triggering buy...")
                        success = self.executor.buy_asset(target_token, stable, amount_usd)
                        if success:
                            self.portfolio.adjust_asset_shares(target_token, amount_usd, is_buy=True)
                            proposals.append(proposal)
                            has_rotated = True
                    else:
                        logger.info(f"Target shift detected for sector {sector} ({diff*100:.1f}%). Triggering sell...")
                        success = self.executor.sell_asset(target_token, stable, amount_usd)
                        if success:
                            self.portfolio.adjust_asset_shares(target_token, amount_usd, is_buy=False)
                            proposals.append(proposal)
                            has_rotated = True

        if not has_rotated and not proposals:
            logger.info("Portfolio weights aligned with current narratives. No swap required.")
            
        logger.info("--- Autonomous Rotation Cycle Completed ---")
        return has_rotated, proposals
