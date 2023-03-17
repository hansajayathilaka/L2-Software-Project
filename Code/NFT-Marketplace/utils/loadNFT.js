import {ethers} from "ethers";
import {nftaddress, nftmarketaddress, rpc} from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import axios from "axios";

export const URINFTDataMapper = async (i) => {
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const nftContract = new ethers.Contract(nftaddress, NFT.abi, provider);

    let tokenUri;
    try {
        tokenUri = await nftContract.tokenURI(i.tokenId.toNumber());
    } catch (e) {
        console.error(e);
    }

    let meta;
    try {
        meta = await axios.get(tokenUri, {maxRedirects: 5});
    } catch (e) {
        console.error(e);
    }
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether');

    return {
        price,
        tokenId: i.tokenId.toNumber(),
        itemId: i.itemId,
        nftContract: i.nftContract,
        owners: i.owners,
        sold: i.sold,
        thumbnail: meta.data.thumbnail,
        attachments: meta.data.attachments,
        name: meta.data.name,
        description: meta.data.description,
        data: meta.data.data,
    };
}

export default async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);

    const data = await marketContract.fetchAllMarketItems();
    const items = await Promise.all(data.map(URINFTDataMapper)).catch(err => {
        console.error(err)
    });

    if (!items) {
        console.error("Error getting items.");
        return []
    } else {
        return items
    }
}
