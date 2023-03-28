import base64
import json

import ipfsapi
import ipfshttpclient
import requests

from django.conf import settings


def upload_files_to_ipfs(files):
    files = {f'file{i}': files[i].file for i in range(len(files)) if files[i] is not None}
    try:
        response = requests.post(
            settings.INFURA_IPFS_URL,
            files=files,
            auth=(settings.INFURA_IPFS_PROJECT_ID, settings.INFURA_IPFS_PROJECT_SECRET)
        )
        res = response.text.strip().split('\n')
        hash_list = []
        for i in res:
            _res = json.loads(i)
            hash_list.append(_res['Hash'])

        return hash_list
    except Exception as e:
        print(e)
        return False


def upload_json_to_ipfs(_json):
    try:
        response = requests.post(
            settings.INFURA_IPFS_URL,
            data=_json,
            auth=(settings.INFURA_IPFS_PROJECT_ID, settings.INFURA_IPFS_PROJECT_SECRET)
        )
        res = response.json
        return res['Hash']
    except Exception as e:
        print(e)
        return False

