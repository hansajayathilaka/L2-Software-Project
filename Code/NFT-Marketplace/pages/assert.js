import {useRouter} from "next/router";
import Link from "next/link";
import {CustomImage} from "../components/Image";
import {useEffect, useState} from "react";
import ConfirmPopup from "../components/ConfirmPopup";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {nftaddress, nftmarketaddress} from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import buyNft from "../utils/buyNFT";
import {SET_LOADING} from "../reducer/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import historyNFT from "../utils/historyNFT";

export default function Assert({state, dispatch}) {
    const router = useRouter();
    const [currentNFT, setCurrentNFT] = useState(null)
    const [isConfirmOpen, setIsConfirmOpen] = useState(true);
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
    },[router.query.tokenId, state.nft]);


    const clickCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(r => {

        })
    }

    const clickBuy = async () => {
        dispatch({
            type: SET_LOADING,
            data: true
        });
        try {
            await buyNft(currentNFT);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        dispatch({
            type: SET_LOADING,
            data: false
        });
    }


    function handleDeleteClick() {
        setIsConfirmOpen(true);
    }

    function handleConfirmClick() {
        // do something
        setIsConfirmOpen(false);
    }

    function handleCancelClick() {
        setIsConfirmOpen(false);
    }

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
                    <a>Goto home page</a>
                </Link>
            </div>
        );
    } else {
        return(
                <>
                    {/*<ConfirmPopup*/}
                    {/*    isOpen={isConfirmOpen}*/}
                    {/*    onConfirm={handleConfirmClick}*/}
                    {/*    onCancel={handleCancelClick}*/}
                    {/*    message="Are you sure you want to delete this item?"*/}
                    {/*/>*/}

                    <div className="container my-24 px-6 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="grow-0 shrink-0 basis-auto mb-12 lg:mb-0 w-full lg:w-5/12 px-3 lg:px-6">
                                <CustomImage src={currentNFT.thumbnail} size="large" />
                            </div>
                            <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
                                <div className="flex-col flex-wrap">
                                    <div className="text-center lg:max-w-3xl md:max-w-xl">
                                        <h2 className="text-3xl font-bold mb-12 px-6">{currentNFT.name}</h2>
                                    </div>
                                    {
                                        edit ?
                                            <>
                                                <div className="flex flex-col grow ml-6 mb-5">
                                                    <p className="font-bold mb-1">Price</p>
                                                    <div className="flex px-4">
                                                        <div className="relative mb-3 xl:w-96">
                                                            <input
                                                                type="text"
                                                                className="min-h-full min-w- shadow-sm border-gray-300 rounded-lg m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                                                                id="priceInput"
                                                                placeholder={`Price ${currentNFT.price}`}/>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="mx-2 inline-block min-h-fit rounded bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                                                onClick=""
                                                            >
                                                                <FontAwesomeIcon icon={solid('user-secret')} />
                                                            </button>
                                                            <button
                                                                className="mx-2 inline-block rounded bg-red-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                                                onClick={() => setEdit(false)}
                                                            >
                                                                <FontAwesomeIcon icon={solid('user-secret')} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="flex flex-col grow ml-6 mb-5">
                                                    <p className="font-bold mb-1">Price</p>
                                                    <div className="flex">
                                                        <p className="px-4 text-3xl text-gray-500">{currentNFT.price} MATIC</p>
                                                        {
                                                            router.query.edit && !edit ?
                                                                <button
                                                                    onClick={() => setEdit(true)}
                                                                    className="inline-block rounded border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                                >
                                                                    Edit
                                                                </button>
                                                                :
                                                                <></>
                                                        }
                                                    </div>

                                                </div>
                                            </>
                                    }

                                    <div className="grow ml-6">
                                        <p className="font-bold mb-1">Description</p>
                                        <p className="text-gray-500 ml-6">{currentNFT.description}</p>
                                    </div>
                                    <div className="grow ml-6">
                                        <p className="font-bold mb-1">Attachments</p>
                                        {
                                            currentNFT.attachments.map((item, index) => {
                                                return <p className="text-gray-500 ml-6" key={index}><a href={item.fileUrl} target="_blank">{item.description}</a></p>
                                            })
                                        }
                                    </div>
                                    <div className="grow ml-6">
                                        <button
                                            type="submit"
                                            className="
                                            mt-8
                                            mx-2
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
                                            onClick={clickCopyLink}
                                        >
                                            Copy Link
                                        </button>
                                        <button
                                            type="submit"
                                            className="
                                            mt-8
                                            mx-2
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
                                            onClick={handleDeleteClick}
                                        >
                                            Buy for {currentNFT.price} MATIC
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>

        );
    }

}