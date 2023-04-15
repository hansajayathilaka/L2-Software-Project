import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import Web3Modal from "web3modal";
import Link from "next/link";

import {nftaddress, nftmarketaddress} from "../config";
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import {CustomImage} from "../components/Image";
import {URINFTDataMapper} from "../utils/loadNFT";
import {SET_LOADING} from "../reducer/actions";


export default function MyAssets(props) {
    const {state, dispatch} = props;
    // const [myNFTs, setMyNFTs] = useState([]);
    const [myNFTs, setMyNFTs] = useState(props.state.nft);

    if (state.loading === false && (myNFTs && !myNFTs.length)) return (
        <h1 className="py-10 px-20 text-3xl">No assets owned</h1>
    );


    return (
        <div className="flex justify-center">
            <div className="px-4" style={{maxWidth: '1600px'}}>
                <div className="grid grid-cols-1, sm:grid-cols-2, lg:grid-cols-4 gap-4 pt-4">
                    {
                        myNFTs.map((nft, i) => (
                            <div key={i} className="flex flex-col justify-between border shadow rounded-xl overflow-hidden">
                                <CustomImage src={nft.thumbnail} />
                                <div className="p-4">
                                    <p className="text-2xl font-semibold">{nft.name}</p>
                                    <div className=" overflow-hidden" title={nft.description}>
                                        <p className="text-gray-400">{nft.description}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-100">
                                    <p className="text-2xl mb-4 font-bold text-gray-800">{nft.price} Matic</p>
                                    <button className="mb-3 w-full bg-blue-400 text-white font-bold py-2 px-12 rounded" onClick={() => console.log(nft)}>
                                        Mark to be Sale
                                    </button>
                                    <Link href={{pathname: '/assert', query: {tokenId: nft.tokenId, edit: true}}}>
                                        <button className="mb-3 w-full bg-blue-400 text-white font-bold py-2 px-12 rounded" title={`Token Id ${nft.tokenId}`}>
                                            More details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
