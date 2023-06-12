import json
from enum import Enum

from django.conf import settings
from web3 import Web3
from web3.types import TxReceipt

from nft_minter.utils import upload_json_to_ipfs


class Contract(Enum):
    NFT_Marketplace = "nft_marketplace"
    NFT = 'nft'


def get_abi(contract_type):
    if contract_type == Contract.NFT_Marketplace:
        abi_path = settings.NFT_MARKETPLACE_ABI_PATH
    elif contract_type == Contract.NFT:
        abi_path = settings.NFT_ABI_PATH
    else:
        raise Exception("Invalid Contract Type")

    with open(abi_path, 'r') as f:
        abi = json.load(f)
    return abi["abi"]


def get_contract(contract_type):
    if contract_type == Contract.NFT_Marketplace:
        address = settings.NFT_MARKETPLACE_CONTRACT_ADDRESS
    elif contract_type == Contract.NFT:
        address = settings.NFT_CONTRACT_ADDRESS
    else:
        raise Exception("Invalid Contract Type")

    w3 = Web3(Web3.HTTPProvider(settings.INFURA_POLYGON_NETWORK_URL))
    contract = w3.eth.contract(address=address, abi=get_abi(contract_type))
    return w3, contract


def create_transaction(w3, contract, function_name, params=None, value=0, gas_price=None) -> TxReceipt:
    if params is None:
        params = []
    account = w3.eth.account.from_key(settings.PRIVATE_KEY)
    nonce = w3.eth.get_transaction_count(account.address)
    tx = getattr(contract.functions, function_name)(*params).build_transaction(
        {
            "gasPrice": gas_price if gas_price else w3.eth.gas_price,
            "chainId": settings.CHAIN_ID,
            "value": value,
            "from": settings.PUBLIC_KEY,
            "nonce": nonce,
        }
    )
    signed_txn = w3.eth.account.sign_transaction(tx, private_key=settings.PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(*tx_receipt['logs'], sep='\n')
    return tx_hash, tx_receipt


def get_event(contract, tx_hash, event_name):
    event_filter = contract.events[event_name].createFilter(fromBlock='latest', argument_filters={'txnHash': tx_hash})
    event_list = event_filter.get_all_entries()
    return event_list


def mint_nft(details, price, owner_name, owner_nic, owner_address):
    # Save primary details in IPFS
    _hash = upload_json_to_ipfs(details)
    print("JSON saved in IPFS", _hash)

    if _hash:

        # Mint NFT
        w3, contract = get_contract(Contract.NFT)
        try:
            tx_hash, receipt = create_transaction(w3, contract, 'createToken', params=[_hash])
            event_logs = contract.events.Transfer().process_receipt(receipt)
            item_id = event_logs[0]["args"]["tokenId"]
            print("Updated in Polygon successfully")
            print(receipt.logs)
        except Exception as e:
            print(e)
            raise e

        # Add NFT to marketplace
        w3, contract = get_contract(Contract.NFT_Marketplace)
        try:
            listing_price = contract.functions.getListingPrice().call()
            _price = w3.to_wei(price, "ether")
            tx_hash, receipt = create_transaction(
                w3, contract,
                'createMarketItem',
                params=[settings.NFT_CONTRACT_ADDRESS, item_id, _price, owner_name, owner_nic, owner_address],
                value=listing_price
            )
            # events = get_event(contract, tx_hash, "MarketItemCreated")
            return receipt.logs
        except Exception as e:
            print(e)
            raise e

    else:
        raise Exception("Error while uploading details to IPFS")
