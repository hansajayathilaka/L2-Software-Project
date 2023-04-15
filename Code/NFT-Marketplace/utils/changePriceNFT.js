import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {nftaddress, nftmarketaddress} from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default async function changePriceNFT(nft, price) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const _price = ethers.utils.parseUnits(price.toString(), 'ether');

    try {
        const tx = await contract.changeMarketItemPrice(nftaddress, nft.tokenId, _price);
        await tx.wait();

        return tx;
    } catch (err) {
        console.error(err);
        debugger;
        return false;
    }

}
