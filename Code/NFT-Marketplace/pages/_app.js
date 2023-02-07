/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import {useReducer, useState} from "react";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  // const [loggedIn, setLoggedIn] = useState(null);
  const [loggedIn, setLoggedIn] = useReducer((state, action) => {
    return action;
  }, null);
  
  const onLoginClick = () => {
    const windowFeatures = "left=100,top=100,width=500,height=700";
    const handle = window.open(`${process.env.NEXT_PUBLIC_VERIFIER_HOST}get-invite?oauth=1&redirect=${process.env.NEXT_PUBLIC_MARKETPLACE_HOST}login/?data=`, "VOMS-Verifyer", windowFeatures);
    if (!handle) {
      alert("Cannot open login window...");
    }
  }

  const onLogoutClick = () => {
    setLoggedIn(false);
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
              {/*<Link href="/create-item">*/}
              {/*  <a className="mr-6 text-blue-600">*/}
              {/*    Sell Digital Asset*/}
              {/*  </a>*/}
              {/*</Link>*/}
              {
                loggedIn ?
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
              {loggedIn ?
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
        <Component {...pageProps} setLogin={setLoggedIn} login={loggedIn} />
      </div>
  )

}

export default MyApp
