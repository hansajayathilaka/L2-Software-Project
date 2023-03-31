from web3 import Web3
import json

# Connect to the Polygon Mumbai testnet
w3 = Web3(Web3.HTTPProvider('https://rpc-mumbai.maticvigil.com'))

# Set the contract address and ABI
contract_address = "0x0000000000000000000000000000000000000000"  # Replace with your contract address
with open('contract_abi.json', 'r') as f:
    contract_abi = json.load(f)

# Instantiate the contract
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Prepare the transaction
account = w3.eth.account.privateKeyToAccount("0xYOURPRIVATEKEY")
value = w3.toWei(1, 'ether')  # Replace with the amount you want to send
gas = 200000
gas_price = w3.toWei('50', 'gwei')

# Create the transaction object
tx = {
    'from': account.address,
    'to': contract_address,
    'value': value,
    'gas': gas,
    'gasPrice': gas_price,
    'nonce': w3.eth.get_transaction_count(account.address),
}

# Sign the transaction with your private key
signed_tx = account.signTransaction(tx)

# Send the transaction to the network
tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)

# Wait for the transaction to be confirmed
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

# Print the transaction receipt
print("Transaction receipt:", tx_receipt)
