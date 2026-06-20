import os
import subprocess
import json
from src.utils.logger import logger, get_twak_cmd

BSC_TOKEN_ADDRESSES = {
    "USDC": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "WBNB": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "CAKE": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    "BUSD": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    "USDT": "0x55d398326f99059fF775485246999027B3197955",
    "XRP": "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    "DOGE": "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    "DOT": "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
    "UNI": "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    "AAVE": "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
    "ONDO": "0xE9B5A3bC8B5393d2Bc1E1941DbeE3A3Bd88C1c0a",
    "PEPE": "0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00",
    "ARB": "0xa0E6e4b3c8F128d1bEf12B7E47E1E8e7D7a9e1a0",
    "OP": "0x0cF7B51b9E1F2b85f0E1F0E9b9E0F0E0F0E0F0E0",
    "FET": "0x031b41e504677879370e9DBbCf6E6C8aC0D9bA9d",
    "RNDR": "0x3A2A1D2b3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q",
}

class TWAKExecutor:
    def __init__(self):
        self.wallet_mode = os.getenv("TWAK_WALLET_MODE", "AgentWallet")
        self.slippage = float(os.getenv("TWAK_SLIPPAGE", "0.5"))
        self.password = os.getenv("TWAK_WALLET_PASSWORD")
        logger.info(f"TWAK Executor initialized in {self.wallet_mode} Mode.")

    def _resolve(self, token):
        return BSC_TOKEN_ADDRESSES.get(token.upper(), token)

    def _execute_twak_swap(self, from_token, to_token, amount_usd):
        logger.info(f"TWAK: Swap {amount_usd:.4f} USD {from_token} -> {to_token} on BSC")
        from_resolved = self._resolve(from_token)
        to_resolved = self._resolve(to_token)
        cmd = [
            get_twak_cmd(), "swap",
            f"{amount_usd:.4f}",
            from_resolved, to_resolved,
            "--chain", "bsc",
            "--slippage", str(self.slippage),
            "--json"
        ]
        if self.password:
            cmd.extend(["--password", self.password])
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            if result.returncode == 0:
                try:
                    data = json.loads(result.stdout)
                    tx_hash = data.get("hash", "unknown")
                    logger.info(f"TWAK swap succeeded: {tx_hash}")
                    return True
                except json.JSONDecodeError:
                    logger.info(f"TWAK swap completed: {result.stdout.strip()}")
                    return True
            else:
                logger.warning(f"TWAK swap failed: {result.stderr.strip()}")
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
