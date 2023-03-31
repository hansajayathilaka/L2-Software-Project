from pathlib import Path

# Account Configurations
PRIVATE_KEY = "0x123..."
PUBLIC_KEY = '0x123...'

# Polygon Configurations
CHAIN_ID = 80001
INFURA_POLYGON_NETWORK_URL = 'https://polygon-mumbai.infura.io/v3/xxxxxxxx'
NFT_MARKETPLACE_ABI_PATH = Path(__file__).resolve().parents[2]\
    .joinpath('NFT-Marketplace/artifacts/contracts/NFTMarket.sol/NFTMarket.json')
NFT_ABI_PATH = Path(__file__).resolve().parents[2]\
    .joinpath('NFT-Marketplace/artifacts/contracts/NFT.sol/NFT.json')
NFT_MARKETPLACE_CONTRACT_ADDRESS = '0x4B664DF4A6b7891283172890889aA8B3797F583B'
NFT_CONTRACT_ADDRESS = '0x0e506bFF5F0271F45a1aB41c22b695fB5bD20f39'

# IPFS Configurations
INFURA_IPFS_PROJECT_ID = 'xxxxx...'
INFURA_IPFS_PROJECT_SECRET = 'xxxxx...'
INFURA_IPFS_URL = 'https://ipfs.infura.io:5001/api/v0/add'
