import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import axios from 'axios';
import Web3Modal from "web3modal";

import {
    nftaddress, nftmarketaddress, rpc
} from "../config";

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';


export default function Home() {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    useEffect(() => {
        loadNFTs().then(() => {
            console.log('NFT loaded...');
        }).catch(err => {
            console.log('Error while loading NFT.');
            console.error(err);
        });
    }, [])

    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);

        const data = await marketContract.fetchMarketItems();
        const items = await Promise.all(data.map(async  i => {
            // const tokenUri = `https://infura-ipfs.io/ipfs/${i.tokenId}`
            let tokenUri;
            try {
                tokenUri = await tokenContract.tokenURI(i.tokenId);
            } catch (e) {
                debugger;
                console.error(e);
            }
            let meta;
            try {
                meta = await axios.get(tokenUri, {maxRedirects: 5});
            } catch (e) {
                debugger;
                console.error(e);
            }
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');

            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            }
            return item;
        })).catch(err => {
            debugger;
            console.error(err)
        });

        if (!items) {
            debugger;
            cosole.error("Error geting items.");
            setNfts([]);
            setLoadingState('loaded');
        } else {
            setNfts(items);
            setLoadingState('loaded');
        }
    }

    async function buyNft(nft) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)

        const signer = provider.getSigner()
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

        const tx = await contract.createMarketSale(nftaddress, nft.tokenId, {
            value: price,
        });

        await tx.wait();
        await loadNFTs();
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <h1 className='px-20 py-10 text-3xl'>No items in marketplace</h1>
    )

    return (
    <div className="flex justify-center">
        <div className="px-4" style={{maxWidth: '1600px'}}>
            <div className="grid grid-cols-1, sm:grid-cols-2, lg:grid-cols-4 gap-4 pt-4">
                {
                    nfts.map((nft, i) => (
                        <div key={i} className="border shadow rounded-xl overflow-hidden">
                            <img src={nft.image} alt="NFT token image" style={{}} />
                            <div className="p-4">
                                <p style={{height: "64px"}} className="text-2xl font-semibold">{nft.name}</p>
                                <div style={{height:'70px', overflow: 'hidden'}}>
                                    <p className="text-gray-400">{nft.description}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-black">
                                <p className="text-2xl mb-4 font-bold text-white">{nft.price} Matic</p>
                                <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                                onClick={() => buyNft(nft)}>Buy</button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    </div>
  )
}
