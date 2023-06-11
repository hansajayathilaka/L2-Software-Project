/* pages/_app.js */
import '../styles/globals.css'
import "../styles/custom.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Link from 'next/link'
import React, {useEffect, useReducer, useState} from "react";
import Image from "next/image";
import {ToastContainer, toast} from 'react-toastify';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import secureLocalStorage from "react-secure-storage";
import {useRouter} from "next/router";

import {initialState, reducer} from "../reducer/ìndex";
import {SET_LOADING, SET_LOGIN, SET_METAMASK, SET_NFT} from "../reducer/actions";
import logo from "../public/logo.svg";
import {checkMetamaskAvailability, getMetamaskAccount} from "../utils/metamask";
import loadNFTs from "../utils/loadNFT";


function _App({Component, pageProps}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [accountPanel, setAccountPanel] = useState(true);
    const [gearMenu, setGearMenu] = useState(false);
    const router = useRouter();

    // Handle login with session storage
    useEffect(() => {
        secureLocalStorage.setItem("test", "test");
        const loginData = JSON.parse(secureLocalStorage.getItem("login"));
        if (loginData) {
            dispatch({
                type: SET_LOGIN,
                data: loginData
            });
        }
    }, []);

    useEffect(() => {
        const val = Math.random();
        console.log("Start UseEffect on _app.js", val);

        // Check availability of metamask in browser.
        if (checkMetamaskAvailability()) {
            if (window.ethereum.isConnected()) {
                dispatch({
                    type: SET_METAMASK,
                    data: window.ethereum.selectedAddress,
                });
            }

            window.ethereum.on('accountsChanged', handleMetamaskAccountChanged);

            updateNFTs();
            console.log("Finish UseEffect on _app.js", val);
            return () => {
                window.ethereum.removeListener('accountsChanged', handleMetamaskAccountChanged);
                console.log("Remove UseEffect on _app.js", val);
            }
        }
    }, []);

    const updateNFTs = (forceReload = false) => {
        dispatch({
            type: SET_LOADING,
            data: true,
        });
        loadNFTs(forceReload).then((items) => {
            window.items = items;
            console.log(items);
            dispatch({
                type: SET_NFT,
                data: items
            });
            dispatch({
                type: SET_LOADING,
                data: false,
            });
        }).catch(err => {
            toast.error("Loading NFT failed");
            console.log('Error while loading NFT.');
            console.error(err);
            dispatch({
                type: SET_LOADING,
                data: false,
            });
        });
    }

    const handleMetamaskAccountChanged = (accounts) => {
        setAccountPanel(true);
        if (accounts.length === 0) {
            dispatch({
                type: SET_METAMASK,
                data: false,
            });
            return
        }
        dispatch({
            type: SET_METAMASK,
            data: accounts[0],
        });
    }

    const onClickConnectMetamask = () => {
        if (checkMetamaskAvailability()) {
            getMetamaskAccount().then(account => {
                // TODO: Check the address with logged in address and verify it is same
                dispatch({
                    type: SET_METAMASK,
                    data: account,
                });
                setAccountPanel(true);
            });
        }
    }

    const onLoginClick = () => {
        const windowFeatures = "left=100,top=100,width=500,height=700";
        const handle = window.open(`${process.env.NEXT_PUBLIC_VERIFIER_HOST}get-invite?oauth=1&redirect=${process.env.NEXT_PUBLIC_MARKETPLACE_HOST}login/?data=`, "VOMS-Verifyer", windowFeatures);
        if (!handle) {
            alert("Cannot open login window...");
        }
    }

    const onLogoutClick = () => {
        toast.info("Logged out successfully");
        dispatch({
            type: SET_LOGIN,
            data: false
        });
    }

    const walletAddressBar = () => {
        if (state.metamask) {
            if (state.loggedIn) {
                console.log(state.metamask.toLowerCase(), state.loggedIn.wallet_address.toLowerCase())
                if (state.metamask.toLowerCase() === state.loggedIn.wallet_address.toLowerCase()) {
                    return (
                        <>
                            <div className="flex items-center container">
                                Conneced Web3: <a href={"https://mumbai.polygonscan.com/address/" + state.metamask}
                                                  target="_blank" rel="noreferrer">[ {state.metamask} ]</a>
                            </div>
                            <button className="mr-3" onClick={() => setAccountPanel(false)}
                                    title="Disconnect from metamask">
                                <FontAwesomeIcon icon={solid('xmark')} size={"lg"} color={'red'}/>
                            </button>
                        </>
                    );
                }
                return (
                    <>
                        <div className="flex items-center container">
                            <label className="font-bold text-red-700">Accounts do not match</label> &emsp;
                            Metamask: <a href={"https://mumbai.polygonscan.com/address/" + state.metamask} target="_blank"
                                         rel="noreferrer">[ {state.metamask} ]</a> &emsp;
                            SSI Wallet: <a href={"https://mumbai.polygonscan.com/address/" + state.loggedIn.wallet_address}
                                           target="_blank" rel="noreferrer">[ {state.loggedIn.wallet_address} ]</a>
                        </div>
                        <button className="mr-3" onClick={() => setAccountPanel(false)}
                                title="Disconnect from metamask">
                            <FontAwesomeIcon icon={solid('xmark')} size={"lg"} color={'red'}/>
                        </button>
                    </>
                );
            }
            return (
                <>
                    <div className="flex items-center container">
                        Metamask: <a href={"https://mumbai.polygonscan.com/address/" + state.metamask} target="_blank"
                                     rel="noreferrer">[ {state.metamask} ]</a>
                    </div>
                    <button className="mr-3" onClick={() => setAccountPanel(false)}
                            title="Disconnect from metamask">
                        <FontAwesomeIcon icon={solid('xmark')} size={"lg"} color={'red'}/>
                    </button>
                </>
            );
        }
        return (
            <div className="flex justify-left container">
                <button onClick={onClickConnectMetamask} className="text-black font-bold">
                    Connect with Metamask
                </button>
            </div>
        );
    }

    return (
        <div>
            <ToastContainer draggable={false}/>
            <nav className="border-b p-2 flex" style={{
                backgroundColor: "#036",
                borderBottomWidth: 2,
                borderBottomStyle: "solid",
                borderBottomColor: "#fcba19"
            }}>
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link href="/">
                        <div className="flex items-center">
                            <Image src={logo} alt="Logo" height={70} width={70}/>
                            <p className="text-4xl font-bold text-white">VOMS Marketplace</p>
                        </div>
                    </Link>
                    <div className="flex flex-row items-center">
                        <Link href="/">
                            <p className={"mr-8 text-white " + (router.pathname === '/' ? "border-2 rounded px-3 py-1" : "")}>
                                Home
                            </p>
                        </Link>
                        {
                            state.loggedIn ?
                                <Link href="/my-assets">
                                    <p className={"mr-8 text-white " + (router.pathname === '/my-assets' ? "border-2 rounded px-3 py-1" : "")}>
                                        My Digital Assets
                                    </p>
                                </Link>
                                : <></>
                        }
                        {
                            state.loggedIn ?
                                <>
                                    <button className="mr-8 text-white inset-y-0 right-0" onClick={onLogoutClick}>
                                        Logout
                                    </button>
                                    <strong className="mr-8 text-white">Hi, {state.loggedIn.fname}</strong>
                                </>
                                :
                                <button className="mr-8 text-white inset-y-0 right-0 flex flex-row items-center"
                                        onClick={onLoginClick}>
                                    <Image className="" src={logo} alt="Logo" height={20} width={20}/>
                                    <strong className="ml-1">Login with VOMS Verifier</strong>
                                </button>
                        }

                    </div>
                </div>
            </nav>

            {/* Gear Menu */}
            <button className="absolute" style={{top: 28, right: 28}} onClick={() => setGearMenu(!gearMenu)}
                    onBlur={() => setGearMenu(false)}>
                <FontAwesomeIcon icon={solid('gear')} size={"lg"} color={"white"}/>
                <div
                    className={`absolute right-0 w-40 py-2 mt-2 rounded-lg shadow-xl z-40 bg-gray-50 ${gearMenu ? "block" : "hidden"}`}>
                    <ul>
                        <li className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-300"
                            onClick={() => updateNFTs(true)}>
                            Force Reload
                        </li>
                        {
                            !accountPanel ?
                                <li className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-300"
                                    onClick={() => setAccountPanel(true)}>
                                    Show Account Pannel
                                </li>
                                : <></>
                        }
                    </ul>
                </div>

            </button>

            {
                accountPanel ?
                    <div
                        className={"flex items-center w-full h-9 " + (state.metamask ? "bg-emerald-100" : "bg-red-200")}>
                        <div className="container flex mx-auto justify-center items-center">
                            {walletAddressBar()}
                        </div>
                    </div>
                    :
                    <></>

            }

            {
                state.loading ?
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                        <div
                            className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                        <p className="w-1/3 text-center text-white">This may take a few seconds, please don&apos;t close
                            this
                            page.</p>
                    </div>
                    :
                    <></>
            }

            <Component className="flex min-h-full"
                       {...pageProps}
                       state={state} dispatch={dispatch} updateNFTs={updateNFTs}
            />
        </div>
    )

}

export default _App
