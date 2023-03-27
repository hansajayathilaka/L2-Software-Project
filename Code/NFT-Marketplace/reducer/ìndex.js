import {SET_LOADING, SET_LOGIN, SET_NFT} from "./actions";


export const initialState = {
    nft: [],
    loggedIn: true,
    loading: false,
}

export const reducer = (state, action) => {
    if (!action.type) {
        console.error(action);
        throw Error("Invalid action");
    }

    switch (action.type) {
        case SET_LOGIN:
            return { ...state, loggedIn: action.data };
        case SET_NFT:
            return { ...state, nft: action.data };
        case SET_LOADING:
            return { ...state, loading: action.data };
    }
}
