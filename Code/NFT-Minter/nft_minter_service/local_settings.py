from pathlib import Path

PRIVATE_KEY = "0x8b89faa5045ce6fb25a3eb8310add012559937e6ad35d989c0de7223813412a9"
PUBLIC_KEY = '0x9917EB0be0d1Ea4aF401BB8fc6627ad19F99c14f'

CHAIN_ID = 0
API_PATH = Path(__file__).resolve().parents[2]\
    .joinpath('NFT-Marketplace/artifacts/contracts/NFTMarket.sol/NFTMarket.json')

INFURA_IPFS_PROJECT_ID = '2EmjXF7GSMqwUg8CQb1q7F4ImWd'
INFURA_IPFS_PROJECT_SECRET = 'a07868d7486d89a1ee3dd2a1649c5571'

print(API_PATH)
