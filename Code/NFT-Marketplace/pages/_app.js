/* pages/_app.js */
import '../styles/globals.css'
import "../styles/custom.css";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import React, {useEffect, useReducer} from "react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';

import { initialState, reducer } from "../reducer/ìndex";
import {SET_LOADING, SET_LOGIN, SET_METAMASK, SET_NFT} from "../reducer/actions";
import loadNFTs from "../utils/loadNFT";
import logo from "../public/logo.svg";


function MyApp({Component, pageProps}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Login
    useEffect(() => {
        if ('caches' in window){

        }
    }, []);

    // Load initial data from Polygon blockchain
    useEffect(() => {
        handleConnectMetamask();
    }, []);

    // Configure with the metamask
    const handleConnectMetamask =  () => {
        if (typeof window.ethereum === 'undefined') {
            toast("Metamask is not installed in this browser", toast.TYPE.ERROR);
        } else {
            if (!ethereum.isMetaMask) {
                toast("You should install metamask for transactions", toast.TYPE.WARNING);
            } else {
                ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                    if (accounts.length > 0) {
                        // TODO: Check the address with logged in address and verify it is same
                        dispatch({
                            type: SET_METAMASK,
                            data: accounts[0],
                        });
                    } else {
                        toast("No account selected", toast.TYPE.ERROR);
                    }
                }).catch(err => {
                    toast(`Metamask: ${err.message}`, toast.TYPE.WARNING);
                })

            }
        }
    };

    const onLoginClick = () => {
        const windowFeatures = "left=100,top=100,width=500,height=700";
        const handle = window.open(`${process.env.NEXT_PUBLIC_VERIFIER_HOST}get-invite?oauth=1&redirect=${process.env.NEXT_PUBLIC_MARKETPLACE_HOST}login/?data=`, "VOMS-Verifyer", windowFeatures);
        if (!handle) {
            alert("Cannot open login window...");
        }
    }

    const onLogoutClick = () => {
        toast("Logged out successfully", {type: toast.TYPE.INFO})
        dispatch({
            type: SET_LOGIN,
            data: false
        });
    }

    return (
        <div>
            <ToastContainer draggable={false} />
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
                            <a className="mr-8 text-white">
                                Home
                            </a>
                        </Link>
                        {/*<Link href="/create-item">*/}
                        {/*    <a className="mr-8 text-white">*/}
                        {/*        Sell Digital Asset*/}
                        {/*    </a>*/}
                        {/*</Link>*/}
                        {
                            state.loggedIn ?
                                <Link href="/my-assets">
                                    <a className="mr-8 text-white">
                                        My Digital Assets
                                    </a>
                                </Link>
                                : <></>
                        }
                        {/*<Link href="/creator-dashboard">*/}
                        {/*  <a className="mr-6 text-blue-600">*/}
                        {/*    Creator Dashboard*/}
                        {/*  </a>*/}
                        {/*</Link>*/}
                        {state.loggedIn ?
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
            <div className={"flex items-center w-full h-16 " + (state.metamask ? "bg-emerald-100" : "bg-red-200")}>
                {
                    state.metamask ?
                        <div className="flex justify-center container">
                            Account {state.metamask}
                        </div>
                        :
                        <div className="flex justify-center container">
                            <button onClick={handleConnectMetamask} className="mb-3 bg-blue-400 text-white font-bold py-2 px-12 rounded">
                                Connect with Metamask
                            </button>
                        </div>
                }
            </div>

            {
                state.loading ?
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                        <div
                            className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                        <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this
                            page.</p>
                    </div>
                    :
                    <></>
            }

            <Component className="flex min-h-full"
                       {...pageProps}
                       state={state} dispatch={dispatch}
            />
        </div>
    )

}

export default MyApp
