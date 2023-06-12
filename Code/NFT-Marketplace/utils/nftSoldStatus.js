import Web3Modal from "web3modal";
import {ethers} from "ethers";

import {nftaddress, nftmarketaddress} from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export const updateSoldStatus = async (nft, status) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    try {
        const tx = await contract.updateMarketItemSoldStatus(nftaddress, nft.tokenId, status);
        await tx.wait();

        return tx;
    } catch (err) {
        console.error(err);
        debugger;
        return false;
    }
}