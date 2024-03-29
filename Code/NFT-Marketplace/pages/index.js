import React, {useEffect} from "react";
import Link from "next/link";

import {CustomImage} from "../components/Image";


export default function Home(prop) {
    const {state, dispatch} = prop;

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
                                <Link href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_SCANNER_URL}/token/${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}?a=${nft.tokenId}`} target="_blank"><button className="mb-3 w-full bg-blue-400 text-white font-bold py-2 px-12 rounded">See NFT History</button></Link>
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
