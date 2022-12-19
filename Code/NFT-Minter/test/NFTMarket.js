const { expect } = require("chai");

describe("NFTMarket", function() {
    it("Should create and execute market sales", async function() {
        const NFTMarket = await ethers.getContractFactory("NFTMarket");
        const market = await NFTMarket.deploy();
        await market.deployed();
        const marketAddress = market.address;

        const NFT = await  ethers.getContractFactory("NFT");
        const nft = await NFT.deploy(marketAddress);
        await nft.deployed();
        const nftContractAddress = nft.address;

        let listingPrice = await market.getListingPrice();
        listingPrice = listingPrice.toString();

        const auctionPrice = ethers.utils.parseUnits('100', 'ether');

        let itemId1 = await nft.createToken("https://tokenlocation.com/1");
        await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice });

        let itemId2 = await nft.createToken("https://tokenlocation.com/2");
        await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice });

        const [_, buyerAddress] = await ethers.getSigners();

        await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice });

        let items = await market.fetchMarketItems();
        items = await Promise.all(items.map(async (item) => {
                const tokenUri = await nft.tokenURI(item.tokenId);
                return {
                    tokenUri,
                    price: item.price.toString(),
                    tokenId: item.tokenId.toString(),
                    seller: item.seller,
                    owner: item.owner,
                }
            })
        );

        console.log('items', items);
    })
});
