from pathlib import Path

# Account Configurations
PRIVATE_KEY = "0x8b89faa5045ce6fb25a3eb8310add012559937e6ad35d989c0de7223813412a9"
PUBLIC_KEY = '0x9917EB0be0d1Ea4aF401BB8fc6627ad19F99c14f'

# Polygon Configurations
CHAIN_ID = 80001
INFURA_POLYGON_NETWORK_URL = 'https://polygon-mumbai.infura.io/v3/b5634cb5d4774309ab5593716f0362b9'
NFT_MARKETPLACE_ABI_PATH = Path(__file__).resolve().parents[2]\
    .joinpath('NFT-Marketplace/artifacts/contracts/NFTMarket.sol/NFTMarket.json')
NFT_ABI_PATH = Path(__file__).resolve().parents[2]\
    .joinpath('NFT-Marketplace/artifacts/contracts/NFT.sol/NFT.json')
NFT_MARKETPLACE_CONTRACT_ADDRESS = '0x4B664DF4A6b7891283172890889aA8B3797F583B'
NFT_CONTRACT_ADDRESS = '0x0e506bFF5F0271F45a1aB41c22b695fB5bD20f39'

# IPFS Configurations
INFURA_IPFS_PROJECT_ID = '2EmjXF7GSMqwUg8CQb1q7F4ImWd'
INFURA_IPFS_PROJECT_SECRET = 'a07868d7486d89a1ee3dd2a1649c5571'
INFURA_IPFS_URL = 'https://ipfs.infura.io:5001/api/v0/add'
