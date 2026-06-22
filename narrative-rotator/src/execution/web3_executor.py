import os
import time
from web3 import Web3
from web3.middleware import ExtraDataToPOAMiddleware
from src.utils.logger import logger

BSC_RPC = os.getenv("BSC_RPC_URL", "https://bsc-dataseed1.binance.org")
PANCAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E"
WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"

BSC_TOKEN_ADDRESSES = {
    "USDC": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "WBNB": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "CAKE": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    "BUSD": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    "USDT": "0x55d398326f99059fF775485246999027B3197955",
    "XRP": "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    "DOT": "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
    "AAVE": "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
    "CFG": "0xfaa53F4A3B29B217E4A60411C490cE1E61144444",
    "FET": "0x031b41e504677879370e9DBcF937283A8691Fa7f",
    "FLOKI": "0xfb5B838b6cfEEdC2873aB27866079AC55363D37E",
    "ADA": "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
    "SOL": "0x570A5D26f7765Ecb712C0924E4De545B89f43BF3",
    "LINK": "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    "SHIB": "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
    "LTC": "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
}

PANCAKE_ROUTER_ABI = [
    {"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},
]

ERC20_ABI = [
    {"constant":True,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
    {"constant":False,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"type":"function"},
    {"constant":True,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},
]

class UserWalletManager:
    def __init__(self):
        self.private_key: str | None = None
        self.address: str | None = None

    def set_wallet(self, address: str, private_key: str | None = None):
        self.address = address
        self.private_key = private_key
        logger.info(f"User wallet set: {address[:6]}...{address[-4:]}" + (" (with private key)" if private_key else " (read-only)"))

    def clear_wallet(self):
        self.address = None
        self.private_key = None
        logger.info("User wallet cleared")

    def is_ready(self) -> bool:
        return bool(self.address and self.private_key)

user_wallet_manager = UserWalletManager()


class Web3Executor:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(BSC_RPC))
        self.w3.middleware_onion.inject(ExtraDataToPOAMiddleware, layer=0)
        self.router = self.w3.eth.contract(address=Web3.to_checksum_address(PANCAKE_ROUTER), abi=PANCAKE_ROUTER_ABI)
        self.slippage = float(os.getenv("TWAK_SLIPPAGE", "0.5"))
        logger.info(f"Web3Executor initialized on BSC (RPC: {BSC_RPC})")

    def _resolve(self, token):
        addr = BSC_TOKEN_ADDRESSES.get(token.upper(), token)
        return Web3.to_checksum_address(addr)

    def _get_token_contract(self, token_address):
        return self.w3.eth.contract(address=Web3.to_checksum_address(token_address), abi=ERC20_ABI)

    def buy_asset(self, symbol, stable_token, amount_usd):
        if not user_wallet_manager.is_ready():
            logger.warning("Web3Executor: No user wallet configured. Skipping.")
            return False
        logger.info(f"Web3: Buy ${amount_usd:.2f} {symbol} with {stable_token}")
        return self._swap(stable_token, symbol, amount_usd)

    def sell_asset(self, symbol, stable_token, amount_usd):
        if not user_wallet_manager.is_ready():
            logger.warning("Web3Executor: No user wallet configured. Skipping.")
            return False
        logger.info(f"Web3: Sell ${amount_usd:.2f} {symbol} for {stable_token}")
        return self._swap(symbol, stable_token, amount_usd)

    def _swap(self, from_token, to_token, amount_usd):
        try:
            account = self.w3.eth.account.from_key(user_wallet_manager.private_key)
            sender = account.address
            from_addr = self._resolve(from_token)
            to_addr = self._resolve(to_token)
            deadline = int(time.time()) + 300

            # Get token decimals and price
            from_contract = self._get_token_contract(from_addr)
            decimals = from_contract.functions.decimals().call()
            price = self._get_token_price_usd(from_token)
            if price <= 0:
                logger.warning(f"Web3: Cannot get price for {from_token}, skipping")
                return False

            amount_in_wei = int((amount_usd / price) * (10 ** decimals))
            if amount_in_wei <= 0:
                logger.warning(f"Web3: Amount too small ({amount_in_wei} wei), skipping")
                return False

            # Get expected output
            path = [from_addr, to_addr] if from_addr != WBNB and to_addr != WBNB else [from_addr, to_addr]
            try:
                amounts = self.router.functions.getAmountsOut(amount_in_wei, path).call()
                min_out = int(amounts[-1] * (100 - self.slippage) / 100)
            except Exception:
                min_out = 0

            # Approve if spending token (not BNB)
            nonce = self.w3.eth.get_transaction_count(sender)
            if from_addr != WBNB:
                approve_tx = from_contract.functions.approve(
                    PANCAKE_ROUTER, amount_in_wei
                ).build_transaction({
                    'from': sender,
                    'nonce': nonce,
                    'gas': 100000,
                    'gasPrice': self.w3.eth.gas_price,
                })
                signed_approve = account.sign_transaction(approve_tx)
                self.w3.eth.send_raw_transaction(signed_approve.raw_transaction)
                logger.info(f"Web3: Approved {from_token} for swap")
                nonce += 1

            # Execute swap (use standard swap for non-fee tokens)
            swap_tx = self.router.functions.swapExactTokensForTokens(
                amount_in_wei, min_out, path, sender, deadline
            ).build_transaction({
                'from': sender,
                'nonce': nonce,
                'gas': 300000,
                'gasPrice': self.w3.eth.gas_price,
            })

            signed_swap = account.sign_transaction(swap_tx)
            tx_hash = self.w3.eth.send_raw_transaction(signed_swap.raw_transaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash, timeout=60)

            if receipt.status == 1:
                logger.info(f"Web3 swap succeeded: {tx_hash.hex()}")
                return True
            else:
                logger.warning(f"Web3 swap failed (tx reverted): {tx_hash.hex()}")
                return False

        except Exception as e:
            logger.warning(f"Web3 swap error: {e}")
            return False

    def _get_token_price_usd(self, token):
        try:
            stable_addr = self._resolve("USDC")
            token_addr = self._resolve(token)
            if token_addr == stable_addr:
                return 1.0
            path = [token_addr, stable_addr]
            amounts = self.router.functions.getAmountsOut(10 ** 18, path).call()
            if amounts and amounts[-1] > 0:
                return amounts[-1] / (10 ** 18)
        except Exception:
            pass
        return 0
