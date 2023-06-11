import os
import logging

from django.apps import AppConfig
from django.conf import settings
from django.core.cache import cache
from django.db.utils import ProgrammingError

import requests

logger = logging.getLogger(__name__)

AGENT_URL = settings.AGENT_URL
API_KEY = settings.AGENT_ADMIN_API_KEY
AGENT_WALLET_SEED = settings.AGENT_WALLET_SEED
INDY_DID_REGISTER_URL = settings.INDY_DID_REGISTER_URL


class IIWBookConfig(AppConfig):
    name = "iiw_book"

    def ready(self):
        # Hack to let the manage command to create the cache table through...
        try:
            cache.get("")
        except ProgrammingError:
            return

        if cache.get("verifier_did") is None:
            register_response = requests.post(INDY_DID_REGISTER_URL, json={
                "seed": AGENT_WALLET_SEED,
                "role": "TRUST_ANCHOR",
                "alias": "VOMS Person SSI Verifier (Docker)"
            })
            register_response_body = register_response.json()
            logger.info(register_response_body)
            cache.set("verifier_did", register_response_body['did'], None)

        # if cache.get("credential_definition_id") is None:
        #     schema_body = {
        #         "schema_name": "ssi-general-person",
        #         "schema_version": settings.SCHEMA_VERSION,
        #         "attributes": ["email", "fname", "lname", "nic", "wallet_address", "sex", "img", "time"],
        #     }
        #     schema_response = requests.post(f"{AGENT_URL}/schemas", headers={"x-api-key": API_KEY}, json=schema_body)
        #
        #     logger.info(schema_response.text)
        #
        #     schema_response_body = schema_response.json()
        #     schema_id = schema_response_body["schema_id"]
        #
        #     credential_definition_body = {"schema_id": schema_id}
        #     credential_definition_response = requests.post(
        #         f"{AGENT_URL}/credential-definitions", headers={"x-api-key": API_KEY},json=credential_definition_body
        #     )
        #
        #     logger.info(credential_definition_response.text)
        #
        #     credential_definition_response_body = credential_definition_response.json()
        #     credential_definition_id = credential_definition_response_body[
        #         "credential_definition_id"
        #     ]
        #     print("="*500)
        #     print(credential_definition_id)
        #     print("="*500)
        #
        #     logger.info(f"cred def id: {credential_definition_id}")
        #
        #     cache.set("credential_definition_id", credential_definition_id, None)
