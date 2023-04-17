import React, {useState, useEffect} from "react";
import Link from "next/link";

import {CustomImage} from "../components/Image";
import {updateSoldStatus} from "../utils/nftSoldStatus";
import {SET_LOADING, SET_NFT} from "../reducer/actions";
import {toast} from "react-toastify";


export default function MyAssets({state, dispatch, updateNFTs}) {
    const [myNFTs, setMyNFTs] = useState([]);

    useEffect(() => {
        const _nft = [];
        for(const nft of state.nft) {
            if (
                (
                    state.loggedIn &&
                    state.loggedIn.wallet_address &&
                    nft.owners[nft.owners.length - 1]._address.toLowerCase() === state.loggedIn.wallet_address.toLowerCase()
                ) || (
                    nft.owners[nft.owners.length - 1]._address.toLowerCase() === state.metamask.toLowerCase())
            ) {
                _nft.push(nft);
            }
        }
        setMyNFTs(_nft);
    }, []);

    if (!state.metamask || !state.loggedIn) return (
        <h1 className="py-10 px-20 text-3xl">Please connect to metamask and login using your SSI</h1>
    );

    if (state.loading === false && (myNFTs && !myNFTs.length)) return (
        <h1 className="py-10 px-20 text-3xl">No assets owned</h1>
    );

    const _updateSoldStatus = (nft, status) => {
        dispatch({
            type: SET_LOADING,
            data: true,
        });
        updateSoldStatus(nft, status).then(doc => {
            toast("Selling status updated successfully", toast.TYPE.INFO);
            updateNFTs();
        }).catch(err => {
            toast("Selling status update failed", toast.TYPE.ERROR);
            toast(err.message, toast.TYPE.ERROR);

            dispatch({
                type: SET_LOADING,
                data: false,
            });
        });
    }

    const onClickToBeSale = (nft) => {
        _updateSoldStatus(nft, false);
    }

    const onClickToSold = (nft) => {
        _updateSoldStatus(nft, true);
    }

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
                                    {
                                        nft.sold ?
                                            <button className="mb-3 w-full bg-blue-400 text-white font-bold py-2 px-12 rounded" onClick={() => onClickToBeSale(nft)}>
                                                Mark to be Sale
                                            </button>
                                            :
                                            <button className="mb-3 w-full bg-blue-400 text-white font-bold py-2 px-12 rounded" onClick={() => onClickToSold(nft)}>
                                                Mark as Sold
                                            </button>
                                    }

                                    <Link href={{pathname: '/assert', query: {tokenId: nft.tokenId, edit: true}}}>
                                        <button className="mb-3 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" title={`Token Id ${nft.tokenId}`}>
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
