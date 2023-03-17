import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {nftaddress, nftmarketaddress} from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";


export default async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

    const tx = await contract.createMarketSale(nftaddress, nft.tokenId, {
        value: price,
    });

    await tx.wait();

    return tx;
}
