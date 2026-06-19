import yaml
import os
import time
from src.utils.logger import logger

class SectorTracker:
    def __init__(self, cmc_client, sentiment_analyzer):
        self.cmc = cmc_client
        self.analyzer = sentiment_analyzer
        self.weights = {}
        self.thresholds = {}
        self.load_configurations()

    def load_configurations(self):
        config_path = "config/narrative_weights.yaml"
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
                self.weights = config.get("weights", {})
                self.thresholds = config.get("thresholds", {})
                logger.info("Narrative weights configuration loaded successfully.")
        else:
            logger.warning("narrative_weights.yaml not found. Using default weights.")
            self.weights = {
                "social_sentiment": 0.35,
                "news_coverage": 0.25,
                "kol_mentions": 0.20,
                "market_volume_surge": 0.15,
                "funding_rates_skew": 0.05
            }
            self.thresholds = {
                "rotation_trigger_heat_diff": 15.0,
                "cold_sector_exit_heat": 35.0,
                "hot_sector_entry_heat": 70.0
            }

    def calculate_sector_heat(self, sector_name):
        """Calculates narrative heat index (0-100) for a sector"""
        raw_data = self.cmc.get_sector_sentiment_index_data = self.cmc.get_sector_sentiment_raw(sector_name)
        
        # 1. Social Sentiment component
        social_score = raw_data.get("social_positive_sentiment", 0.5) * 100
        
        # 2. News component
        news_score = raw_data.get("news_positive_ratio", 0.5) * 100
        
        # 3. KOL mentions component
        kol_score = raw_data.get("kol_sentiment_index", 0.5) * 100
        
        # 4. Volume surge component (simulated surge metric)
        volume_surge = min(100.0, (raw_data.get("news_volume_24h", 100) / 500.0) * 100)
        
        # 5. Funding rates skew component
        funding_skew = min(100.0, max(0.0, (raw_data.get("funding_rate_skew", 0.0) + 0.02) / 0.1 * 100))

        # Weighted calculation
        heat = (
            social_score * self.weights.get("social_sentiment", 0.35) +
            news_score * self.weights.get("news_coverage", 0.25) +
            kol_score * self.weights.get("kol_mentions", 0.20) +
            volume_surge * self.weights.get("market_volume_surge", 0.15) +
            funding_skew * self.weights.get("funding_rates_skew", 0.05)
        )
        
        logger.info(f"Sector '{sector_name}' narrative heat calculated: {heat:.2f}%")
        return round(heat, 2)

    def track_all_sectors(self, sectors_config):
        """Tracks heat index for all defined sectors in config with rate-limit spacing"""
        heats = {}
        for sector_name in sectors_config.keys():
            heats[sector_name] = self.calculate_sector_heat(sector_name)
            time.sleep(1)  # 1s delay between sectors to avoid CMC rate limits
        return heats
