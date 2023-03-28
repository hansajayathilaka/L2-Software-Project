const hre = require("hardhat");

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log('NFTMarket deployed successfully');

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
  console.log('NFT deployed successfully');

  console.log("");
  console.log("Replace first 2 lines in .env file with fallowing lines");
  console.log(`NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS=${nftMarket.address}`);
  console.log(`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${nft.address}`);
  console.log("");
  console.log("Update the contract address in NFT-Minter also. Replace bellow 2 lines in Code/NFT-Minter/nft_minter_service/local_settings.py")
  console.log(`NFT_MARKETPLACE_CONTRACT_ADDRESS = '${nftMarket.address}'`);
  console.log(`NFT_CONTRACT_ADDRESS = '${nft.address}'`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
