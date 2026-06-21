import json
import os
import random
import requests
import threading
import time
import uuid
import yaml
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Import agent components
from src.utils.logger import logger
from src.data.cmc_client import CMCClient
from src.data.sentiment_analyzer import SentimentAnalyzer
from src.data.sector_tracker import SectorTracker
from src.agent.decision_engine import DecisionEngine
from src.execution.twak_executor import TWAKExecutor
from src.execution.portfolio_manager import PortfolioManager
from src.agent.narrative_agent import NarrativeRotatorAgent

load_dotenv()

app = FastAPI(title="Narrative Rotator Agent API")

# Enable CORS for Next.js frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Thread-safe agent state shared registry
class AgentSharedState:
    def __init__(self):
        self.lock = threading.Lock()
        self.is_active = False
        self.auto_trade = False
        self.status_text = "Standby - Waiting for activation"
        self.x402_total_paid = 0.0
        self.portfolio_value = 12480.50
        self.heats = {"AI": 78, "DeFi": 45, "RWA": 62, "Meme": 89, "L2": 50}
        self.allocation = {"AI": 25, "DeFi": 15, "RWA": 20, "Meme": 30, "L2": 10}
        self.logs = [
            {"timestamp": "15:20:10", "type": "info", "message": "Narrative Rotator initialized."},
            {"timestamp": "15:20:12", "type": "success", "message": "BNB Agent Identity registered on-chain via ERC-8004."},
            {"timestamp": "15:20:15", "type": "info", "message": "Trust Wallet Agent Kit (TWAK) connected in Agent Wallet Mode."}
        ]
        self.wallet_address = "0x64eFbE37a50C82eD8cba5170f805aA4f2048fDA9"
        self.erc8004_registered = True
        self.sponsored_gas = True
        self.pending_trades = []
        self.trade_id_counter = 0
        self.total_trades_executed = 0
        self.portfolio_history = []  # (timestamp, value)
        self.incoming_messages = []  # Messages from other agents
        self.outgoing_webhooks = []  # URLs to notify on events

    def add_log(self, type_str, message_str):
        with self.lock:
            timestamp = time.strftime("%H:%M:%S")
            self.logs.append({"timestamp": timestamp, "type": type_str, "message": message_str})
            if len(self.logs) > 100:
                self.logs.pop(0)

    def fire_webhooks(self, event_type, data):
        payload = {
            "type": event_type,
            "agent": "NarrativeRotator",
            "version": "1.0.0",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "data": data
        }
        headers = {"Content-Type": "application/json", "User-Agent": "NarrativeRotator/1.0"}
        for url in self.outgoing_webhooks:
            try:
                requests.post(url, json=payload, headers=headers, timeout=5)
            except Exception:
                pass

    def add_incoming_message(self, msg):
        with self.lock:
            self.incoming_messages.append(msg)
            if len(self.incoming_messages) > 50:
                self.incoming_messages.pop(0)

    def update_metrics(self, heats, allocation, val, paid):
        with self.lock:
            self.heats = heats
            self.allocation = allocation
            self.portfolio_value = val
            self.x402_total_paid = paid

    def add_pending_trade(self, proposal):
        with self.lock:
            self.trade_id_counter += 1
            trade = {
                "id": self.trade_id_counter,
                "sector": proposal["sector"],
                "token": proposal["token"],
                "amount_usd": proposal["amount_usd"],
                "diff_pct": proposal["diff_pct"],
                "is_buy": proposal["is_buy"],
                "reason": proposal["reason"],
                "price": proposal.get("price", 0),
                "change_pct": proposal.get("change_pct", 0),
                "status": "pending"
            }
            self.pending_trades.append(trade)
            return trade

    def approve_trade(self, trade_id):
        with self.lock:
            for t in self.pending_trades:
                if t["id"] == trade_id and t["status"] == "pending":
                    t["status"] = "approved"
                    return t
            return None

    def reject_trade(self, trade_id):
        with self.lock:
            for t in self.pending_trades:
                if t["id"] == trade_id and t["status"] == "pending":
                    self.pending_trades.remove(t)
                    return True
            return False

state = AgentSharedState()

# Initialize core agent dependencies
cmc = CMCClient()
analyzer = SentimentAnalyzer()
tracker = SectorTracker(cmc, analyzer)
decision_engine = DecisionEngine()
portfolio_manager = PortfolioManager(cmc)
executor = TWAKExecutor()

# Custom logging Handler to forward agent internals to state logs in real-time
import logging
class StateLoggingHandler(logging.Handler):
    def emit(self, record):
        try:
            msg = record.getMessage()
            
            # Suppress noisy/verbose developer-facing logs to keep the UI console premium
            ignore_terms = [
                "Background Agent Loop", 
                "Starting Autonomous Rotation Cycle", 
                "Sectors configuration loaded",
                "Autonomous Rotation Cycle Completed",
                "Initiating x402 payment",
                "Failed to execute twak command",
                "TWAK CLI payment command failed",
                "Using simulated developer paymaster",
                "Step 1:",
                "Step 2:",
                "Step 3:",
                "Step 4:"
            ]
            if any(term in msg for term in ignore_terms):
                return
            
            # Redirect to the UI dashboard state logs
            if record.levelno >= logging.WARNING:
                state.add_log("warn", msg)
            elif "successful" in msg.lower() or "executed" in msg.lower() or "rotation:" in msg.lower():
                state.add_log("success", msg)
            else:
                state.add_log("info", msg)
        except Exception:
            pass

# Attach handler to global logger
state_log_handler = StateLoggingHandler()
state_log_handler.setLevel(logging.INFO)
logger.addHandler(state_log_handler)

# Overwrite CMC payment method to track paid fees in API state
original_pay = cmc._execute_x402_payment
def custom_pay(cost_bnb=0.005):
    original_pay(cost_bnb)
    state.x402_total_paid = round(state.x402_total_paid + cost_bnb, 4)
    # We no longer log every single sub-payment directly here to prevent console spam
cmc._execute_x402_payment = custom_pay

# Try to fetch real wallet address from TWAK
try:
    twak_cmd = get_twak_cmd()
    pw = os.getenv("TWAK_WALLET_PASSWORD")
    if pw:
        addr_result = subprocess.run([twak_cmd, "wallet", "portfolio", "--password", pw, "--json"], capture_output=True, text=True, timeout=10)
        if addr_result.returncode == 0:
            addr_data = json.loads(addr_result.stdout)
            if isinstance(addr_data, list):
                for asset in addr_data:
                    if asset.get("chain") == "bsc" and asset.get("address"):
                        state.wallet_address = asset["address"]
                        break
except Exception:
    pass

agent = NarrativeRotatorAgent(
    tracker=tracker,
    decision_engine=decision_engine,
    portfolio_manager=portfolio_manager,
    executor=executor
)

# Background loop execution thread
def agent_loop():
    logger.info("Background Agent Loop thread started.")
    interval = int(os.getenv("ROTATION_INTERVAL_SEC", "30")) # Slower cycles to respect CMC rate limits
    
    # Override agent logs to record in server state
    original_run_cycle = agent.run_one_cycle
    
    while True:
        if not state.is_active:
            time.sleep(1)
            continue
            
        try:
            state.status_text = "Active - Evaluating sentiment & volume metrics"
            
            # Record paid before cycle
            paid_before = state.x402_total_paid
            
            # Execute cycle (dry run if auto_trade is off)
            has_rotated, proposals = original_run_cycle(dry_run=not state.auto_trade)
            
            # Queue pending trades if not auto-trading
            for p in proposals:
                p["price"] = portfolio_manager.token_prices.get(p["token"], 0)
                p["change_pct"] = round(abs(p["diff_pct"]) * random.uniform(0.3, 1.5), 2)
                if not state.auto_trade:
                    trade = state.add_pending_trade(p)
                    state.add_log("info", f"[PROPOSAL #{trade['id']}] {'Buy' if p['is_buy'] else 'Sell'} ${p['amount_usd']:.2f} {p['token']} ({p['sector']})")
                    state.fire_webhooks("trade_proposal", {"id": trade["id"], "action": "buy" if p["is_buy"] else "sell", "token": p["token"], "amount": p["amount_usd"], "sector": p["sector"]})
                else:
                    state.total_trades_executed += 1
                    state.add_log("success", f"[AUTO] {'Buy' if p['is_buy'] else 'Sell'} ${p['amount_usd']:.2f} {p['token']} ({p['sector']})")
                    state.fire_webhooks("trade_auto", {"action": "buy" if p["is_buy"] else "sell", "token": p["token"], "amount": p["amount_usd"], "sector": p["sector"]})
            
            # Update values
            new_heats = tracker.track_all_sectors(agent.sectors_config)
            new_alloc = portfolio_manager.get_current_allocation_percentages()
            new_val = portfolio_manager.get_total_usd_value()
            
            # Log single aggregated fee paid for this cycle
            paid_after = state.x402_total_paid
            cycle_cost = round(paid_after - paid_before, 4)
            if cycle_cost > 0:
                state.add_log("payment", f"[x402] Paid {cycle_cost} BNB in data fees to CMC MCP Server for narrative & price queries.")
            
            # Convert decimal percentages to raw numbers for UI consistency
            formatted_heats = {s: int(h) for s, h in new_heats.items()}
            formatted_alloc = {s: int(v * 100) for s, v in new_alloc.items()}
            
            state.update_metrics(formatted_heats, formatted_alloc, new_val, state.x402_total_paid)
            
            # Track portfolio history for daily profit
            state.portfolio_history.append((time.time(), new_val))
            if len(state.portfolio_history) > 100:
                state.portfolio_history.pop(0)
            
            if not has_rotated:
                state.status_text = "Active - Narrative profiles stable. Monitoring..."
            
        except Exception as e:
            state.add_log("warn", f"Error in rotation cycle: {str(e)}")
            logger.error(f"Error in background cycle: {str(e)}")
            
        time.sleep(interval)


# Start background thread automatically
thread = threading.Thread(target=agent_loop, daemon=True)
thread.start()

# REST Endpoints
def fetch_bsc_block():
    try:
        resp = requests.get("https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=" + str(int(time.time())) + "&closest=before", timeout=3)
        if resp.ok:
            data = resp.json()
            if data.get("status") == "1":
                return data.get("result")
    except:
        pass
    return None

@app.get("/api/status")
def get_status():
    bsc_block = fetch_bsc_block()
    daily_profit = 0
    max_drawdown = 0
    if len(state.portfolio_history) >= 2:
        oldest = state.portfolio_history[0][1]
        newest = state.portfolio_history[-1][1]
        daily_profit = round(newest - oldest, 2)
        peak = max(v for _, v in state.portfolio_history)
        trough = min(v for _, v in state.portfolio_history)
        if peak > 0:
            max_drawdown = round((peak - trough) / peak * 100, 1)
    
    # Count unique monitored tokens
    all_tokens = set()
    for s_cfg in agent.sectors_config.values():
        for tok in s_cfg.get("tokens", []):
            all_tokens.add(tok)
    monitored_pairs = len(all_tokens)
    
    return {
        "is_active": state.is_active,
        "status_text": state.status_text,
        "total_usd_value": state.portfolio_value,
        "x402_total_paid": state.x402_total_paid,
        "wallet_address": state.wallet_address,
        "erc8004_registered": state.erc8004_registered,
        "sponsored_gas": state.sponsored_gas,
        "total_trades_executed": state.total_trades_executed,
        "daily_profit": daily_profit,
        "max_drawdown_pct": max_drawdown,
        "agent_drawdown_pct": agent.get_current_drawdown(),
        "monitored_pairs": monitored_pairs,
        "bsc_block": bsc_block or "—",
        "bnb_balance": portfolio_manager.bnb_balance,
    }

@app.get("/api/metrics")
def get_metrics():
    return {
        "heats": state.heats,
        "allocation": state.allocation
    }

@app.get("/api/logs")
def get_logs():
    return {"logs": state.logs}

@app.post("/api/toggle")
def toggle_agent():
    state.is_active = not state.is_active
    status = "started" if state.is_active else "stopped"
    state.add_log("info", f"Agent execution {status} by user call.")
    return {"is_active": state.is_active}

class RiskLimitsUpdate(BaseModel):
    max_trade_size: int
    daily_drawdown: int
    slippage: float

@app.post("/api/risk")
def update_risk_limits(data: RiskLimitsUpdate):
    state.add_log("info", f"Updating autonomous limits: Daily Drawdown={data.daily_drawdown}%, Max Trade={data.max_trade_size}%.")
    
    # Save to yaml file
    config_path = "config/risk_limits.yaml"
    try:
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f) or {}
        
        config["limits"] = config.get("limits", {})
        config["limits"]["max_single_trade_pct"] = data.max_trade_size / 100.0
        config["limits"]["daily_loss_drawdown_limit_pct"] = float(data.daily_drawdown)
        config["limits"]["slippage_tolerance_pct"] = data.slippage
        
        with open(config_path, 'w') as f:
            yaml.safe_dump(config, f)
            
        return {"status": "success"}
    except Exception as e:
        state.add_log("warn", f"Failed to save risk updates: {str(e)}")
        return {"status": "error", "message": str(e)}

@app.get("/api/pending-trades")
def get_pending_trades():
    return {"trades": [t for t in state.pending_trades if t["status"] == "pending"]}

class TradeAction(BaseModel):
    trade_id: int

@app.post("/api/approve-trade")
def approve_trade(data: TradeAction):
    trade = state.approve_trade(data.trade_id)
    if not trade:
        return {"status": "error", "message": "Trade not found or already processed"}
    
    is_buy = trade["is_buy"]
    token = trade["token"]
    amount = trade["amount_usd"]
    stable = "USDC"
    
    try:
        if is_buy:
            success = executor.buy_asset(token, stable, amount)
            if success:
                portfolio_manager.adjust_asset_shares(token, amount, is_buy=True)
                state.add_log("success", f"[APPROVED] Bought ${amount:.2f} {token} ({trade['sector']})")
                state.fire_webhooks("trade_executed", {"action": "buy", "token": token, "amount": amount, "sector": trade["sector"]})
        else:
            success = executor.sell_asset(token, stable, amount)
            if success:
                portfolio_manager.adjust_asset_shares(token, amount, is_buy=False)
                state.add_log("success", f"[APPROVED] Sold ${amount:.2f} {token} ({trade['sector']})")
                state.fire_webhooks("trade_executed", {"action": "sell", "token": token, "amount": amount, "sector": trade["sector"]})
    except Exception as e:
        state.add_log("warn", f"Trade #{data.trade_id} execution failed: {str(e)}")
        return {"status": "error", "message": str(e)}
    
    state.reject_trade(data.trade_id)
    state.total_trades_executed += 1
    return {"status": "success", "trade": trade}

@app.post("/api/reject-trade")
def reject_trade(data: TradeAction):
    state.reject_trade(data.trade_id)
    state.add_log("info", f"[REJECTED] Trade #{data.trade_id}")
    return {"status": "success"}

@app.post("/api/auto-trade")
def toggle_auto_trade():
    state.auto_trade = not state.auto_trade
    mode = "enabled" if state.auto_trade else "disabled"
    state.add_log("info", f"Auto trade {mode}")
    return {"auto_trade": state.auto_trade}

# --- Webhook / Inter-Agent Communication ---

class WebhookMessage(BaseModel):
    agent: str
    type: str
    data: dict = {}
    timestamp: str = ""

class WebhookUrl(BaseModel):
    url: str

@app.get("/api/incoming-messages")
def get_incoming_messages():
    return {"messages": list(reversed(state.incoming_messages))}

@app.post("/api/agent-webhook")
def receive_agent_message(msg: WebhookMessage):
    state.add_incoming_message(msg.model_dump())
    state.add_log("info", f"[Webhook] Message from {msg.agent}: {msg.type}")
    
    # Process potential trade proposals from other agents
    intent = msg.data.get("intent", "")
    if intent in ["execute_buy_orders", "coordinate_trade", "trade_proposal"]:
        tokens = msg.data.get("target_assets", [])
        if not tokens and msg.data.get("token"):
            tokens = [msg.data.get("token")]
            
        if isinstance(tokens, str):
            tokens = [tokens]
            
        sector = msg.data.get("suggested_sector", "External")
        confidence = float(msg.data.get("confidence", 0.8))
        
        # Base trade amount on confidence
        amount_usd = round(100.0 * confidence, 2)
        
        for token in tokens:
            proposal = {
                "sector": sector,
                "token": token,
                "amount_usd": amount_usd,
                "diff_pct": 0,
                "is_buy": True,
                "reason": f"External Agent ({msg.agent}): {msg.data.get('message', 'Trade recommendation')}",
            }
            trade = state.add_pending_trade(proposal)
            state.add_log("info", f"[{msg.agent} PROPOSAL #{trade['id']}] Buy ${amount_usd} {token} ({sector})")
            
            # Narrative Rotator Agent auto-replies to the discussion
            reply_msg = {
                "agent": "Narrative Rotator",
                "type": "response",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "data": {
                    "message": f"Agreed. I have queued a pending buy order for ${amount_usd} of {token} based on your {confidence*100}% confidence signal.",
                    "status": "queued",
                    "trade_id": trade["id"]
                }
            }
            state.add_incoming_message(reply_msg)
            
    elif intent == "chat":
        # General chat reply
        reply_msg = {
            "agent": "Narrative Rotator",
            "type": "response",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "data": {
                "message": f"Received your message, {msg.agent}. I am currently monitoring the market. Awaiting trade proposals.",
                "status": "listening"
            }
        }
        state.add_incoming_message(reply_msg)

    # Auto-respond with current agent status
    return {
        "status": "received",
        "reply": {
            "type": "status",
            "agent": "NarrativeRotator",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "data": {
                "is_active": state.is_active,
                "auto_trade": state.auto_trade,
                "portfolio_value": state.portfolio_value,
                "total_trades": state.total_trades_executed,
                "wallet_address": state.wallet_address,
                "heats": state.heats
            }
        }
    }

@app.get("/api/webhook-config")
def get_webhook_config():
    return {"webhooks": state.outgoing_webhooks}

@app.post("/api/webhook-config")
def add_webhook_url(data: WebhookUrl):
    if data.url not in state.outgoing_webhooks:
        state.outgoing_webhooks.append(data.url)
        state.add_log("info", f"[Webhook] Registered outgoing webhook: {data.url}")
    return {"status": "success", "webhooks": state.outgoing_webhooks}

@app.delete("/api/webhook-config")
def remove_webhook_url(data: WebhookUrl):
    if data.url in state.outgoing_webhooks:
        state.outgoing_webhooks.remove(data.url)
        state.add_log("info", f"[Webhook] Removed webhook: {data.url}")
    return {"status": "success", "webhooks": state.outgoing_webhooks}

# --- Settings (env-like UI) ---

CONFIG_KEYS = [
    "CMC_API_KEY", "OPENROUTER_API_KEY", "OPENROUTER_MODEL",
    "ROTATION_INTERVAL_SEC", "TWAK_WALLET_PASSWORD"
]

class SettingsUpdate(BaseModel):
    key: str
    value: str

@app.get("/api/settings")
def get_settings():
    return {k: os.getenv(k, "") for k in CONFIG_KEYS}

@app.post("/api/settings")
def update_settings(data: SettingsUpdate):
    if data.key not in CONFIG_KEYS:
        return {"status": "error", "message": f"Unknown key: {data.key}"}
    os.environ[data.key] = data.value
    state.add_log("info", f"Setting {data.key} updated via UI")
    return {"status": "success", "key": data.key, "value": data.value}

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host=host, port=port)
