import React, {useEffect} from "react";
import Link from "next/link";

import {CustomImage} from "../components/Image";
import {SET_LOADING} from "../reducer/actions";
import buyNft from "../utils/buyNFT";


export default function Home(prop) {
    const {state, dispatch} = prop;

    const clickBuyNFT = async (nft) => {
        dispatch({
            type: SET_LOADING,
            data: true
        });

        try {
            await buyNft(nft);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }

        dispatch({
            type: SET_LOADING,
            data: false
        });
    }

    if (!state.loading && !state.nft.length) return (
        <h1 className='px-20 py-10 text-3xl'>No items in marketplace</h1>
    )

    return (
    <div className="flex justify-center">
        <div className="px-4" style={{maxWidth: '1600px'}}>
            <div className="grid grid-cols-1, sm:grid-cols-2, lg:grid-cols-4 gap-4 pt-4">
                {
                    state.nft.map((nft, i) => nft.sold ? <></> : (
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
                                {
                                    state.loggedIn ?
                                        <button className="mb-3 w-full bg-blue-400 text-white font-bold py-2 px-12 rounded"
                                                onClick={() => clickBuyNFT(nft)}>Buy</button>
                                    : <></>
                                }
                                <Link href={{pathname: '/assert', query: {tokenId: nft.tokenId}}}><button className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" title={`Token Id ${nft.tokenId}`}>More details</button></Link>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    </div>
  )
}
