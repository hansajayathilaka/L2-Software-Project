import {toast} from "react-toastify";

export const checkMetamaskAvailability = () => {
    if (typeof window.ethereum === 'undefined') {
        toast("Metamask is not installed in this browser", toast.TYPE.ERROR);
    } else {
        if (!window.ethereum.isMetaMask) {
            toast("You should install metamask for transactions", toast.TYPE.WARNING);
        } else {
            console.log("Metamask is ready to go");
        }
    }
}

export const getMetamaskAccount = async () => {
    let account = false;
    try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        if (accounts.length > 0) {
            account = accounts[0];
        } else {
            toast("No account selected", toast.TYPE.ERROR);
        }
    } catch (err) {
        debugger;
        toast(`Metamask: ${err.message}`, toast.TYPE.WARNING);
    }
    return account;
};
