import {setConnectionID} from "../utils/connectionIdManage";
import {UPDATE_CONNECTION_ID} from "./actions";


const initState = {
    ConnectionID: undefined,
}

export const reducer = async (state = initState, action) => {
    console.log('Res ', action);
    switch (action.type) {
        case UPDATE_CONNECTION_ID:
            const val = (state.ConnectionID || []).concat([action.payload]);
            await setConnectionID(val);
            state = {...state, ConnectionID: val};
            break;
    }

    return state
}
