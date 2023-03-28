/* pages/_app.js */
import '../styles/globals.css'
import "../styles/custom.css";
import Link from 'next/link'
import {useEffect, useReducer} from "react";
import { initialState, reducer } from "../reducer/ìndex";
import {SET_LOADING, SET_LOGIN, SET_NFT} from "../reducer/actions";
import loadNFTs from "../utils/loadNFT";


function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const val = Math.random();
    console.log("Start UseEffect on _app.js", val);
    dispatch({
      type: SET_LOADING,
      data: true,
    });
    loadNFTs().then((items) => {
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
      console.log('Error while loading NFT.');
      console.error(err);
      dispatch({
        type: SET_LOADING,
        data: false,
      });
    });
    console.log("Finish UseEffect on _app.js", val);
    return () => {
      console.log("Remove UseEffect on _app.js", val);
    }
  }, [])
  
  const onLoginClick = () => {
    const windowFeatures = "left=100,top=100,width=500,height=700";
    const handle = window.open(`${process.env.NEXT_PUBLIC_VERIFIER_HOST}get-invite?oauth=1&redirect=${process.env.NEXT_PUBLIC_MARKETPLACE_HOST}login/?data=`, "VOMS-Verifyer", windowFeatures);
    if (!handle) {
      alert("Cannot open login window...");
    }
  }

  const onLogoutClick = () => {
    dispatch({
      type: SET_LOGIN,
      data: false
    });
  }

  return (
      <div>
        <nav className="border-b p-6 flex">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <p className="text-4xl font-bold">VOMS Marketplace</p>
            <div>
              <Link href="/">
                <a className="mr-4 text-blue-600">
                  Home
                </a>
              </Link>
              <Link href="/create-item">
                <a className="mr-6 text-blue-600">
                  Sell Digital Asset
                </a>
              </Link>
              {
                state.loggedIn ?
                    <Link href="/my-assets">
                      <a className="mr-6 text-blue-600">
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
                  <button className="mr-6 text-blue-900 inset-y-0 right-0" onClick={onLogoutClick}>
                    Logout
                  </button>
                  :
                  <button className="mr-6 text-blue-900 inset-y-0 right-0" onClick={onLoginClick}>
                    Login
                  </button>
              }

            </div>
          </div>
        </nav>

        {
          state.loading ?
              <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
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
