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
                "AI": {"tokens": ["FET", "RNDR"]},
                "DeFi": {"tokens": ["UNI", "AAVE"]},
                "Meme": {"tokens": ["PEPE", "DOGE"]},
                "RWA": {"tokens": ["ONDO", "CFG"]},
                "L2": {"tokens": ["ARB", "OP"]}
            }

    def run_one_cycle(self, dry_run=False):
        logger.info("--- Starting Autonomous Rotation Cycle ---")
        
        # 1. Update prices & evaluate current portfolio USD value
        logger.info("Step 1: Fetching active market quotes & sentiment data...")
        self.portfolio.update_portfolio_valuation(self.sectors_config)
        current_value = self.portfolio.get_total_usd_value()
        current_allocation = self.portfolio.get_current_allocation_percentages()
        logger.info(f"Current Portfolio Valuation: ${current_value:.2f} USD")
        logger.info(f"Current Allocations: {current_allocation}")

        # 2. Get real-time heat indexes for all sectors
        logger.info("Step 2: Tracking sector heat rankings via CMC Agent Hub...")
        sector_heats = self.tracker.track_all_sectors(self.sectors_config)
        logger.info(f"Active Sector heats: {sector_heats}")

        # 3. Calculate target risk-adjusted allocations
        logger.info("Step 3: Calculating target allocations in Decision Engine...")
        target_allocation = self.decision.calculate_target_allocations(sector_heats, current_allocation)

        # 4. Detect rotations
        logger.info("Step 4: Detecting portfolio rotation needs...")
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
                
                proposal = {
                    "sector": sector,
                    "token": target_token,
                    "stable": stable,
                    "amount_usd": round(amount_usd, 2),
                    "diff_pct": round(diff * 100, 1),
                    "is_buy": is_buy,
                    "reason": f"{sector} heat shifted by {abs(diff)*100:.1f}% vs target"
                }
                proposals.append(proposal)
                
                if dry_run:
                    logger.info(f"  [DRY RUN] Would {'buy' if is_buy else 'sell'} {target_token} ({amount_usd:.2f} USD)")
                else:
                    if is_buy:
                        logger.info(f"Target shift detected for sector {sector} (+{diff*100:.1f}%). Triggering buy...")
                        success = self.executor.buy_asset(target_token, stable, amount_usd)
                        if success:
                            self.portfolio.adjust_asset_shares(target_token, amount_usd, is_buy=True)
                            has_rotated = True
                    else:
                        logger.info(f"Target shift detected for sector {sector} ({diff*100:.1f}%). Triggering sell...")
                        success = self.executor.sell_asset(target_token, stable, amount_usd)
                        if success:
                            self.portfolio.adjust_asset_shares(target_token, amount_usd, is_buy=False)
                            has_rotated = True

        if not has_rotated and not proposals:
            logger.info("Portfolio weights aligned with current narratives. No swap required.")
            
        logger.info("--- Autonomous Rotation Cycle Completed ---")
        return has_rotated, proposals
