import base64
import ipfsapi
import ipfshttpclient

from django.conf import settings


def get_ipfs_client():
    string = f'{settings.INFURA_IPFS_PROJECT_ID}:{settings.INFURA_IPFS_PROJECT_SECRET}'
    string_bytes = string.encode('utf-8')
    encoded_bytes = base64.b64encode(string_bytes)
    encoded_string = encoded_bytes.decode('utf-8')

    # Create an IPFS client instance with configuration
    # client = ipfshttpclient.connect(
    #     addr='https://ipfs.infura.io:5001/api/v0',
    #     headers={
    #         'authorization': f'Basic {encoded_string}',
    #     },
    # )
    client = ipfsapi.connect(
        host='ipfs.infura.io',
        port=5001,
        base='api/v0',
        headers={
            'authorization': f'Basic {encoded_string}',
        },
    )
    print(client)
    return client


def upload_to_ipfs(files):
    client = get_ipfs_client()

    res = []
    for file in files:
        # Upload the file to IPFS
        _res = client.add(file)
        res.append(_res['Hash'])

    # Return the IPFS hash of the uploaded file
    return res
