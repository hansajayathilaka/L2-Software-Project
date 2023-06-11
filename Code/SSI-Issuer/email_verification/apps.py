import os
import logging
import requests

from django.apps import AppConfig
from django.conf import settings
from django.core.cache import cache
from django.db.utils import ProgrammingError

#setting a logger
logger = logging.getLogger(__name__)
AGENT_URL = getattr(settings, "AGENT_URL", 'localhost')
API_KEY = getattr(settings, "AGENT_ADMIN_API_KEY", '')


class EmailVerificationConfig(AppConfig):
    name = "email_verification"

    def ready(self):

        # Hack to let the manage command to create the cache table through...
        try:
            cache.get("")
        except ProgrammingError:
            return
        
        # implementing a check for the existence of a credential definition ID in a cache. If the ID is not found in the cache,
        #  it proceeds to create a new schema and credential definition

        if cache.get("credential_definition_id") is None:
            schema_body = {
                "schema_name": "ssi-person",
                "schema_version": settings.SCHEMA_VERSION,
                "attributes": ["nic", "fname", "lname", "dob", "address", "wallet_address", "img", "sex", "email", "time"],
            }
            schema_response = requests.post(f"{AGENT_URL}/schemas", headers={"x-api-key": API_KEY}, json=schema_body)

            logger.info(schema_response.text)

            schema_response_body = schema_response.json()
            schema_id = schema_response_body["schema_id"]

            credential_definition_body = {"schema_id": schema_id}
            credential_definition_response = requests.post(
                f"{AGENT_URL}/credential-definitions", headers={"x-api-key": API_KEY}, json=credential_definition_body
            )

            logger.info(credential_definition_response.text)

            credential_definition_response_body = credential_definition_response.json()
            credential_definition_id = credential_definition_response_body[
                "credential_definition_id"
            ]

            logger.info(f"cred def id: {credential_definition_id}")

            cache.set("credential_definition_id", credential_definition_id, None)


class NftMinterConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'nft_minter'