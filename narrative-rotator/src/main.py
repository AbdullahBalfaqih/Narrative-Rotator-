import os
import sys
import time
from dotenv import load_dotenv

# Ensure src is on the path (for python src/main.py direct invocation)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.utils.logger import logger
from src.data.cmc_client import CMCClient
from src.data.sentiment_analyzer import SentimentAnalyzer
from src.data.sector_tracker import SectorTracker
from src.agent.decision_engine import DecisionEngine
from src.execution.twak_executor import TWAKExecutor
from src.execution.portfolio_manager import PortfolioManager
from src.agent.narrative_agent import NarrativeRotatorAgent

def main():
    # 1. Load environment parameters
    load_dotenv()
    
    logger.info("==================================================")
    logger.info("Starting Narrative Rotator AI Trading Agent Loop")
    logger.info("==================================================")
    
    # 2. Instantiate data clients
    cmc = CMCClient()
    analyzer = SentimentAnalyzer()
    tracker = SectorTracker(cmc, analyzer)
    
    # 3. Instantiate execution components
    decision_engine = DecisionEngine()
    portfolio_manager = PortfolioManager(cmc)
    executor = TWAKExecutor()
    
    # 4. Initialize agent orchestrator
    agent = NarrativeRotatorAgent(
        tracker=tracker,
        decision_engine=decision_engine,
        portfolio_manager=portfolio_manager,
        executor=executor
    )
    
    # Cycle configuration
    interval_seconds = int(os.getenv("ROTATION_INTERVAL_SEC", "300")) # Default 5 mins
    logger.info(f"Agent running. Scanning interval: {interval_seconds} seconds.")
    
    try:
        while True:
            agent.run_one_cycle()
            logger.info(f"Sleeping for {interval_seconds} seconds...")
            time.sleep(interval_seconds)
    except KeyboardInterrupt:
        logger.info("Agent execution terminated by user signal (Ctrl+C). Shutting down.")
    except Exception as e:
        logger.error(f"Critical error in main loop: {str(e)}")

if __name__ == "__main__":
    main()
