import {useRouter} from "next/router";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import { toast } from 'react-toastify';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import { confirmAlert } from 'react-confirm-alert';

import {CustomImage} from "../components/Image";
import buyNft from "../utils/buyNFT";
import {SET_LOADING} from "../reducer/actions";
import changePriceNFT from "../utils/changePriceNFT";

/**
 * This is for view vehicle assert
 * @param state
 * @param dispatch
 * @returns {JSX.Element}
 * @constructor
 */
export default function Assert(prop) {
    const {state, dispatch, updateNFTs} = prop;
    const router = useRouter();
    const editPriceBoxRef = useRef(null);
    const [currentNFT, setCurrentNFT] = useState(null)
    const [edit, setEdit] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const tokenId = Number(router.query.tokenId);
        let _currentNFT = []

        for(const nft of state.nft) {
            if (tokenId === nft.tokenId) {
                _currentNFT.push(nft);
            }
        }

        if (_currentNFT.length === 1) {
            setCurrentNFT(_currentNFT[0]);
            setPrice(_currentNFT[0].price);
            console.log(currentNFT);
        }
    },[currentNFT, router.query.tokenId, state.nft]);


    const onClickCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(r => {
            toast("Link copied to clipboard", {type: toast.TYPE.INFO});
        })
    }

    const _buyNFT = async () => {
        dispatch({
            type: SET_LOADING,
            data: true
        });
        try {
            await buyNft(currentNFT);
            toast("NFT buy successfully", toast.TYPE.INFO);
            updateNFTs();
        } catch (err) {
            toast("Buying NFT failed", toast.TYPE.ERROR);
            toast(err.message, toast.TYPE.ERROR);
            console.error(err);
        }
        dispatch({
            type: SET_LOADING,
            data: false
        });
    }

    async function handleChangePriceClick() {
        debugger;
        if (price === "") {
            toast("Invalid Price", {type: toast.TYPE.ERROR});
        } else {
            dispatch({
                type: SET_LOADING,
                data: true
            });
            try {
                await changePriceNFT(currentNFT, price);
                toast("Price changed successfully", toast.TYPE.INFO);
                setEdit(false);
                updateNFTs(true);
            } catch (err) {
                toast("Price change failed", toast.TYPE.ERROR);
                toast(err.message, toast.TYPE.ERROR);
            }
        }
    }

    function handlePriceChangeCancelClick() {
        setEdit(false);
    }

    function handleBuyClick() {
        if (state.loggedIn === false) {
            toast("Please login before buy...", {type: toast.TYPE.ERROR})
            return;
        }
        confirmAlert({
            title: 'Confirm Buy',
            message: 'Are you sure that you want to buy this?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'bg-blue-500 text-white hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out',
                    style: {
                        backgroundColor: "rgb(59 130 246)",
                        float: "right",
                    },
                    onClick: () => {
                        buyNft(currentNFT);
                    }
                },
                {
                    label: 'No',
                    className: 'bg-yellow-500 text-white hover:bg-yellow-700 hover:shadow-lg transition duration-150 ease-in-out',
                    style: {
                        backgroundColor: "rgb(245 158 11)",
                        float: "right"
                    },
                    onClick: () => {}
                }
            ]
        });
    }

    const PriceComp = () => {
        if (router.query.edit) {
            if (edit === true) {
                return (
                    <div className="flex items-center">
                        <p className="font-bold text-2xl">Price</p>
                        <div className="flex m-2">
                            <input
                                className="appearance-none block p-2 px-4 text-3xl w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name" type="text" placeholder={currentNFT.price}
                                ref={editPriceBoxRef}
                                value={price}
                                onChange={val => setPrice(val.target.value)}
                                autoFocus
                            />
                            <div className="flex mx-6 items-center">
                                <div className="flex items-center mr-2 px-2 border-2 rounded-lg h-full hover:bg-gray-200" onClick={handleChangePriceClick}>
                                    <FontAwesomeIcon icon={solid("check")} size={"3x"} color={'green'} />
                                </div>
                                <div className="flex items-center px-4 border-2 rounded-lg h-full hover:bg-gray-200" onClick={handlePriceChangeCancelClick}>
                                    <FontAwesomeIcon icon={solid('xmark')} size={"3x"} color={'red'} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="flex items-center">
                        <p className="font-bold text-2xl">Price</p>
                        <div className="flex">
                            <p className="text-3xl text-gray-500 p-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-200 hover:text-gray-800"
                               onClick={() => setEdit(true)}
                            >
                                {currentNFT.price} MATIC
                            </p>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className="flex items-center">
                    <p className="font-bold text-2xl">Price</p>
                    <div className="flex">
                        <p className="px-4 text-3xl text-gray-500">{currentNFT.price} MATIC</p>
                    </div>
                </div>
            )
        }
    };


    if (state.loading) {
        return (
            <></>
        )
    }
    else if (!currentNFT) {
        return (
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Invalid token ID
                </h1>
                <Link href="/">
                    <p>Goto home page</p>
                </Link>
            </div>
        );
    } else {
        return(
                <>
                    <div className="container my-5 px-6 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="grow-0 shrink-0 basis-auto mb-12 lg:mb-0 w-full lg:w-5/12 px-3 lg:px-6 pt-4">
                                <CustomImage src={currentNFT.thumbnail} size="large" />
                                <div className="flex flex-col grow py-5">
                                    <PriceComp />
                                </div>
                                <div className="grow">
                                    <button
                                        type="submit"
                                        className="
                                            mt-8
                                            mr-4
                                            px-6
                                            py-2.5
                                            bg-amber-500
                                            text-white
                                            font-bold
                                            leading-tight
                                            rounded
                                            hover:bg-amber-700 hover:shadow-lg
                                            transition
                                            duration-150
                                            ease-in-out"
                                        onClick={onClickCopyLink}
                                    >
                                        Copy Link
                                    </button>
                                    <button
                                        type="submit"
                                        className="
                                            mt-8
                                            px-6
                                            py-2.5
                                            bg-blue-500
                                            text-white
                                            font-bold
                                            leading-tight
                                            rounded
                                            hover:bg-blue-700 hover:shadow-lg
                                            transition
                                            duration-150
                                            ease-in-out"
                                        onClick={handleBuyClick}
                                        title={!state.loggedIn ? "Please login before buy" : ""}
                                    >
                                        Buy for {currentNFT.price} MATIC
                                    </button>
                                </div>
                            </div>
                            <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
                                <div className="flex-col flex-wrap">
                                    <div className="text-center lg:max-w-3xl md:max-w-xl">
                                        <h2 className="text-4xl font-bold mb-12 px-6">{currentNFT.name}</h2>
                                    </div>
                                    <div className="grow ml-6 flex justify-between pb-2">
                                        <p className="text-gray-500 mb-1">Description</p>
                                        <p className="font-bold ml-6">{currentNFT.description}</p>
                                    </div>
                                    {
                                        Object.entries(currentNFT.more_data).map(([key,value],i) => {
                                            const split_key = key.split("_");
                                            const formatted_key = split_key.map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase());
                                            const formatted_string = formatted_key.join(" ")
                                            return (
                                                <div className="grow ml-6 pt-3 pb-2 flex justify-between items-center border-t-2" key={i}>
                                                    <p className="text-gray-500 mb-1">{formatted_string}</p>
                                                    <p className="font-bold ml-6">{value}</p>
                                                </div>
                                            );
                                        })
                                    }
                                    <div className="grow ml-6 flex justify-between pt-3 border-t-2">
                                        <p className="text-gray-500 mb-1">Attachments</p>
                                        <p>
                                            {
                                                currentNFT.attachments.map((item, index) => {
                                                    return <p className="font-bold ml-6" key={index}>
                                                        <a href={"image/" + item.fileUrl} target="_blank" rel="noreferrer">{item.description}</a>
                                                    </p>
                                                })
                                            }
                                        </p>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </>

        );
    }

}