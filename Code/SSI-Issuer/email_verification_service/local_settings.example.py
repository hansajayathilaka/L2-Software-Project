DEBUG = True

SITE_URL = 'http://localhost:8080'
AGENT_URL = 'http://localhost:5000'
AGENT_ADMIN_API_KEY = ''
SCHEMA_VERSION = "0.0.2"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": 'postgres',
        "USER": 'postgres',
        "PASSWORD": 'password',
        "HOST": 'localhost',
        "PORT": 5430,
    }
}

EMAIL_HOST = 'localhost'
EMAIL_PORT = 26
EMAIL_USE_SSL = False
