import os
import subprocess
import json
from src.utils.logger import logger, get_twak_cmd

BSC_TOKEN_ADDRESSES = {
    "USDC": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "USDT": "0x55d398326f99059fF775485246999027B3197955",
    "WBNB": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "CAKE": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    "DOGE": "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    "SHIB": "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
    "FLOKI": "0xfb5B838b6cfEEdC2873aB27866079AC55363D37E",
    "FET": "0x031b41e504677879370e9DBcF937283A8691Fa7f",
    "INJ": "0xa2B726B1145A4773F68593CF171187d8EBe4d495",
    "UNI": "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    "AAVE": "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
    "LINK": "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    "ETH": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    "ADA": "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
    "DOT": "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
}

class TWAKExecutor:
    def __init__(self):
        self.wallet_mode = os.getenv("TWAK_WALLET_MODE", "AgentWallet")
        self.slippage = float(os.getenv("TWAK_SLIPPAGE", "0.5"))
        self.password = os.getenv("TWAK_WALLET_PASSWORD")
        logger.info(f"TWAK Executor initialized in {self.wallet_mode} Mode.")

    def _resolve(self, token):
        return BSC_TOKEN_ADDRESSES.get(token.upper(), token)

    def _is_twak_available(self):
        try:
            subprocess.run([get_twak_cmd(), "--version"], capture_output=True, text=True, timeout=5)
            return True
        except (FileNotFoundError, OSError, subprocess.TimeoutExpired):
            return False

    def _execute_twak_swap(self, from_token, to_token, amount_usd):
        if not self._is_twak_available():
            logger.warning("TWAK CLI not available on this server. Swap skipped.")
            return False
        logger.info(f"TWAK: Swap {amount_usd:.4f} USD {from_token} -> {to_token} on BSC")
        from_resolved = self._resolve(from_token)
        to_resolved = self._resolve(to_token)
        cmd = [
            get_twak_cmd(), "swap",
            "--usd", f"{amount_usd:.4f}",
            from_resolved, to_resolved,
            "--chain", "bsc",
            "--slippage", str(self.slippage),
            "--json"
        ]
        if self.password:
            cmd.extend(["--password", self.password])
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            # TWAK outputs progress text + JSON to stdout; scan for JSON object
            output = (result.stdout or "") + (result.stderr or "")
            json_start = output.find("{")
            json_end = output.rfind("}") + 1
            if json_start >= 0 and json_end > json_start:
                json_str = output[json_start:json_end]
                data = json.loads(json_str)
                if "error" in data:
                    logger.warning(f"TWAK swap failed: {data['error']}")
                    return False
                tx_hash = data.get("hash", "unknown")
                logger.info(f"TWAK swap succeeded: {tx_hash}")
                return True
            else:
                logger.warning(f"TWAK swap failed: {output.strip()[:200]}")
                return False
        except Exception as e:
            logger.warning(f"TWAK swap error: {e}")
            return False

    def buy_asset(self, symbol, stable_token, amount_usd):
        logger.info(f"TWAK: Buying {symbol} with {stable_token}")
        return self._execute_twak_swap(stable_token, symbol, amount_usd)

    def sell_asset(self, symbol, stable_token, amount_usd):
        logger.info(f"TWAK: Selling {symbol} for {stable_token}")
        return self._execute_twak_swap(symbol, stable_token, amount_usd)
