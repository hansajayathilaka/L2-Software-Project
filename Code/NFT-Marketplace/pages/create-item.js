import React, {useState} from "react";
import {ethers} from "ethers";
import {create as ipfsHttpClient} from "ipfs-http-client";
import {useRouter} from "next/router";
import Web3Modal from "web3modal";

import {
    nftaddress, nftmarketaddress
} from "../config";

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

const ipfs_projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const ipfs_projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECREY;

const auth = 'Basic ' + Buffer.from(ipfs_projectId + ':' + ipfs_projectSecret).toString('base64');
const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth
    }
});

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({price: 0, name: '', description: ''});
    const router = useRouter();

    async function onChange(e) {
        const file = e.target.files[0];

        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`Received: ${prog}`)
                }
            )
            const url = `https://ipfs.io/ipfs/${added.path}`;
            console.log(`IPFS image url: ${url}`);
            setFileUrl(url);
        } catch (err) {
            console.error(err);
        }
    }

    async function createItem() {
        debugger;
        if (!formInput.name || !formInput.price || !formInput.description) {
            return;
        }
        debugger;
        const data = JSON.stringify({
            name: formInput.name, description: formInput.description,
            thumbnail: fileUrl,
            attachments: [
                {
                    description: "Thumbnail",
                    fileUrl: fileUrl
                }
            ]
        });

        try {
            const added = await client.add(data);
            const url = `https://ipfs.io/ipfs/${added.path}`;
            await createSale(url);
        } catch (err) {
            console.log('Error while uploading file', err);
        }
    }

    async function createSale(url) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const nftContract = new ethers.Contract(nftaddress, NFT.abi, signer);
        const nftTransaction = await nftContract.createToken(url);
        let tx = await nftTransaction.wait();

        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();

        const price = ethers.utils.parseUnits(formInput.price, 'ether');

        const MarketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
        let listingPrice = await MarketContract.getListingPrice();
        listingPrice = listingPrice.toString();

        const marketTransaction = await MarketContract.createMarketItem(
            nftaddress, tokenId, price, {value: listingPrice}
        )
        await marketTransaction.wait();
        await router.push('/');
    }

    return(
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input
                    type="text"
                    className="mt-2 border rounded p-4"
                    placeholder='Asset Name'
                    onChange={e => updateFormInput({...formInput, name: e.target.value})}
                />
                <textarea
                    className="mt-2 border rounded p-4"
                    placeholder='Description'
                    onChange={e => updateFormInput({...formInput, description: e.target.value})}
                />
                <input
                    type="text"
                    className="mt-2 border rounded p-4"
                    placeholder='Price'
                    onChange={e => updateFormInput({...formInput, price: e.target.value})}
                />
                <input
                    type="file"
                    className="mt-2 border rounded p-4"
                    placeholder='Asset'
                    onChange={onChange}
                />
                {
                    fileUrl && (
                        <img src={fileUrl} className="rounded mt-4" alt="NFT" width="350"/>
                    )
                }
                <button
                    onClick={createItem}
                    className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                >
                    Create Digital Asset
                </button>
            </div>
        </div>
    )
}
