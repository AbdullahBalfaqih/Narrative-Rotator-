import yaml
import os
from src.utils.logger import logger

class DecisionEngine:
    def __init__(self):
        self.risk_limits = {}
        self.load_risk_limits()

    def load_risk_limits(self):
        config_path = "config/risk_limits.yaml"
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
                self.risk_limits = config.get("limits", {})
                logger.info("Decision Engine: Risk limits config loaded successfully.")
        else:
            logger.warning("risk_limits.yaml not found. Using default risk profiles.")
            self.risk_limits = {
                "max_allocation_per_sector": 0.40,
                "min_allocation_per_sector": 0.05,
                "max_single_trade_pct": 0.15,
                "daily_loss_drawdown_limit_pct": 5.0,
                "slippage_tolerance_pct": 0.5
            }

    def calculate_target_allocations(self, sector_heats, current_allocation):
        """
        Calculates target portfolio allocation weights based on narrative heats.
        Adheres strictly to the max/min limits to protect user funds.
        """
        total_heat = sum(sector_heats.values())
        if total_heat == 0:
            return current_allocation

        logger.info("Decision Engine: Evaluating target allocations...")
        max_sector_cap = self.risk_limits.get("max_allocation_per_sector", 0.40)
        min_sector_cap = self.risk_limits.get("min_allocation_per_sector", 0.05)
        
        # 1. Allocate based on raw heats
        raw_allocations = {}
        for sector, heat in sector_heats.items():
            raw_allocations[sector] = heat / total_heat

        # 2. Adjust for risk limits (Cap max, Floor min)
        target_allocation = {}
        excess = 0.0
        floor_count = 0
        
        for sector, pct in raw_allocations.items():
            if pct > max_sector_cap:
                target_allocation[sector] = max_sector_cap
                excess += (pct - max_sector_cap)
            elif pct < min_sector_cap:
                target_allocation[sector] = min_sector_cap
                excess -= (min_sector_cap - pct)
                floor_count += 1
            else:
                target_allocation[sector] = pct

        # 3. Distribute excess allocation proportionally
        unbounded_sectors = [
            s for s, pct in target_allocation.items() 
            if pct > min_sector_cap and pct < max_sector_cap
        ]
        
        if unbounded_sectors and excess != 0:
            distribution_share = excess / len(unbounded_sectors)
            for s in unbounded_sectors:
                target_allocation[s] = max(
                    min_sector_cap, 
                    min(max_sector_cap, target_allocation[s] + distribution_share)
                )

        # Normalize to exactly 1.0 (100%)
        final_total = sum(target_allocation.values())
        for sector in target_allocation:
            target_allocation[sector] = round(target_allocation[sector] / final_total, 4)

        logger.info(f"Target allocations calculated: {target_allocation}")
        return target_allocation
