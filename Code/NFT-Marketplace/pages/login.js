import React, {useEffect} from "react";
import {useRouter} from "next/router";


function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

export default function Login({setLogin}) {
    const router = useRouter();
    useEffect(() => {
        try {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const data = urlParams.get('data')
            const _data = JSON.parse(b64_to_utf8(data).replace(/'/g, '"'));
            setLogin(_data);
            router.push('/').then(r => console.log("Logged in...")).catch(e => console.error("Error while routing..."));
        } catch (e) {
            debugger
            router.replace('/').then(r => console.log("No Logged in...")).catch(e => console.error("Error while routing..."));
        }
    }, [])


    return (<>Login</>)
}
