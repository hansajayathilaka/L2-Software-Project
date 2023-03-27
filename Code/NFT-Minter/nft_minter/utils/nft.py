import json

from django.conf import settings
from web3.types import TxReceipt


def get_abi():
    with open(settings.API_PATH, 'r') as f:
        abi = json.load(f)
    return abi


def create_transaction(w3, contract, function_name, params=None, gas_price=None) -> TxReceipt:
    if params is None:
        params = []
    nonce = w3.eth.getTransactionCount(settings.PUBLIC_KEY)
    tx = getattr(contract.functions, function_name)(*params).buildTransaction(
        {
            "gasPrice": gas_price if gas_price else w3.eth.gas_price,
            "chainId": settings.CHAIN_ID,
            "from": settings.PUBLIC_KEY,
            "nonce": nonce,
        }
    )
    signed_txn = w3.eth.account.sign_transaction(tx, private_key=settings.PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(*tx_receipt['logs'], sep='\n')
    return tx_receipt


def mint_nft(details):
    ...

