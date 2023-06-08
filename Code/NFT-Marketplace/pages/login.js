import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {SET_LOGIN} from "../reducer/actions";
import {toast} from "react-toastify";


function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

export default function Login({state, dispatch}) {
    const router = useRouter();

    useEffect(() => {
        try {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const data = urlParams.get('data')
            const _data = JSON.parse(b64_to_utf8(data).replace(/'/g, '"'));
            dispatch({
                type: SET_LOGIN,
                data: _data
            });
            toast("Logged in successfully", {type: toast.TYPE.INFO})
            router.push('/').then(r => console.log("Logged in...")).catch(e => console.error("Error while routing..."));
        } catch (e) {
            debugger
            router.replace('/').then(r => console.log("No Logged in...")).catch(e => console.error("Error while routing..."));
        }
    }, [router])


    return (<>Login</>)
}
