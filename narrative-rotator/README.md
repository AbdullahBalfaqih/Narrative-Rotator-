# Narrative Rotator Agent - Python Backend

Autonomous Sentiment-Driven Sector Rotation Trading Agent running on **BNB Chain (BSC)**.

This agent monitors market narrative heat indexes in real-time across five primary sectors (AI, DeFi, Meme, RWA, L2) using **CoinMarketCap AI Agent Hub**, tracks social/news sentiment, calculates optimal allocations under strict guardrails, and executes autonomous portfolio rotations via **Trust Wallet Agent Kit (TWAK)**.

---

## Technical Features

1. **Autonomous Execution (TWAK)**: Executes token swaps on PancakeSwap V3 (BSC) with custom slippage protection, keeping private keys strictly local (Self-Custody).
2. **CoinMarketCap Agent Hub & MCP**: Queries market data, derivative funding rates, social volumes, and whale metrics.
3. **x402 Pay-per-query**: Automated BNB data fee payments directly to API/MCP endpoints during data collection runs.
4. **On-Chain Identity Registration**: Registers agent metadata under **ERC-8004** on BNB Chain utilizing BNB Agent SDK and MegaFuel sponsored gas.

---

## Project Structure

```
narrative-rotator/
├── config/
│   ├── sectors.yaml          # Sectors constituent assets & primary stables
│   ├── risk_limits.yaml      # Guardrail thresholds (drawdown, trade size, slippage)
│   └── narrative_weights.yaml # Weights for social sentiment, news, & KOLs
├── src/
│   ├── main.py               # Main runtime loop entrypoint
│   ├── agent/
│   │   ├── narrative_agent.py # Agent coordinator cycle logic
│   │   └── decision_engine.py # Allocation engine & risk limit checker
│   ├── data/
│   │   ├── cmc_client.py     # CMC MCP and x402 payment connector
│   │   ├── sentiment_analyzer.py # Sentence sentiment parser
│   │   └── sector_tracker.py # Heat index aggregator
│   ├── execution/
│   │   ├── twak_executor.py  # Swap executing connector for TWAK CLI
│   │   └── portfolio_manager.py # Balance valuer & holdings adjustor
│   ├── payments/
│   │   └── x402_payer.py     # Pay-per-request payment engine
│   └── utils/
│       └── logger.py         # Standard logger configuration
└── scripts/
    └── register_agent.py     # ERC-8004 BNB Chain registration script
```

---

## Getting Started

### 1. Install System Requirements
Ensure that you have installed the CMC CLI and TWAK CLI locally:
```bash
# Install CoinMarketCap CLI
brew install coinmarketcap-official/CoinMarketCap-CLI/cmc
cmc auth

# Install Trust Wallet Agent Kit
curl -fsSL https://agent-kit.trustwallet.com/install.sh | bash
```

### 2. Configure Python Environment
Install the python requirements list:
```bash
pip install -r requirements.txt
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
CMC_API_KEY=your_coinmarketcap_api_key_here
CMC_MCP_URL=https://mcp.coinmarketcap.com/mcp
TWAK_WALLET_MODE=AgentWallet
TWAK_SLIPPAGE=0.5
BNB_MEGAFUEL_PAYMASTER=https://megafuel.bnbchain.org/v1/paymaster
USE_X402=True
ROTATION_INTERVAL_SEC=300
```

---

## Running the Agent

### 1. On-Chain Registration
Register your agent identity on BNB Chain:
```bash
python scripts/register_agent.py
```

### 2. Run the Main Cycle
Start the autonomous narrative monitoring and portfolio rotation cycle:
```bash
python src/main.py
```
Outputs and swap reports will be printed to stdout and saved in `logs/agent.log`.
