import {toast} from "react-toastify";

export const checkMetamaskAvailability = () => {
    if (typeof window.ethereum === 'undefined') {
        toast.error("Metamask is not installed in this browser");
    } else {
        if (!window.ethereum.isMetaMask) {
            toast.warning("You should install metamask for transactions");
        } else {
            console.log("Metamask is ready to go");
            return true;
        }
    }
    return false;
}

export const getMetamaskAccount = async () => {
    let account = false;
    try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        if (accounts.length > 0) {
            account = accounts[0];
        } else {
            toast.error("No account selected");
        }
    } catch (err) {
        debugger;
        toast.warning(`Metamask: ${err.message}`);
    }
    return account;
};
