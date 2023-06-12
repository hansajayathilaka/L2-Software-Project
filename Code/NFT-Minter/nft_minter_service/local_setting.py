import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql_psycopg2",
#         "NAME": 'minter',
#         "USER": 'minter',
#         "PASSWORD": 'minter',
#         "HOST": 'localhost',
#         "PORT": 5432,
#     }
# }

DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

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
NFT_MARKETPLACE_CONTRACT_ADDRESS = '0xCa27f0350Ba50763Bf3C0Ed972DDC3B394939d03'
NFT_CONTRACT_ADDRESS = '0x1B5e01B3Ae1A0D60Fb130a1E8b4929EE9Eb54481'

# IPFS Configurations
INFURA_IPFS_PROJECT_ID = '2EmjXF7GSMqwUg8CQb1q7F4ImWd'
INFURA_IPFS_PROJECT_SECRET = 'a07868d7486d89a1ee3dd2a1649c5571'
INFURA_IPFS_URL = 'https://ipfs.infura.io:5001/api/v0/add'

# Email Configurations
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'jayathilakahansa@gmail.com'
EMAIL_HOST_PASSWORD = 'lpvppcanwufupsej'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
