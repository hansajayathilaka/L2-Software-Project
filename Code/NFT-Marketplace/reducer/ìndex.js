import {SET_LOADING, SET_LOGIN, SET_METAMASK, SET_NFT} from "./actions";
import secureLocalStorage from "react-secure-storage";
import {data} from "autoprefixer";


export const initialState = {
    nft: [],
    loggedIn: false,
    loading: false,
    metamask: false,
}

export const reducer = (state, action) => {
    if (!action.type) {
        console.error(action);
        throw Error("Invalid action");
    }

    switch (action.type) {
        case SET_LOGIN:
            if (action.data === false) {
                secureLocalStorage.clear();
            } else {
                secureLocalStorage.setItem("login", JSON.stringify(action.data));
            }
            return { ...state, loggedIn: action.data };
        case SET_NFT:
            return { ...state, nft: action.data };
        case SET_LOADING:
            return { ...state, loading: action.data };
        case SET_METAMASK:
            return { ...state, metamask: action.data };
    }
}
