import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {nftaddress, nftmarketaddress} from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";


export default async function historyNFT(nft) {
    if (!nft) return

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftaddress, NFT.abi, signer)

    const tokenId = nft.tokenId;

    async function getPastOwners() {
        const tokenURI = await contract.tokenURI(4).call();

        const response = await fetch(tokenURI);
        const data = await response.json();

        // The previous owners can be found in the "history" field of the JSON object
        const pastOwners = data.history;

        return pastOwners;
    }

    getPastOwners().then(pastOwners => {
        console.log('Past owners:', pastOwners);
    }).catch(error => {
        console.error(error);
    });
}
