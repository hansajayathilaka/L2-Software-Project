DEBUG = True

AGENT_WALLET_SEED = "vomcverifyer00000000000000000000"
SITE_URL = "http://localhost:8080"
INDY_SSI_ISSUER_DID = "TduHMBiPVkFvrLhwZteMUn"
AGENT_URL = "http://localhost:4000"
STAFF_EMAILS = "hansajayathilaka@yahoo.com"
CONFERENCE_OPTIONS = "VOMS,NFT Marketplace"
INDY_DID_REGISTER_URL = "http://test.bcovrin.vonx.io/register"
AGENT_ADMIN_API_KEY = ""

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": 'postgres',
        "USER": 'postgres',
        "PASSWORD": 'password',
        "HOST": 'localhost',
        "PORT": 5431,
    }
}

EMAIL_HOST = 'localhost'
EMAIL_PORT = 27
EMAIL_USE_SSL = False
