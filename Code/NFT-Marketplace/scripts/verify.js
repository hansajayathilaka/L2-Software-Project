const hre = require("hardhat");

const nftMarketAddress = process.env.NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS;
const nftAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS

async function main() {
  await hre.run("verify:verify", {
    address: nftMarketAddress,
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: nftAddress,
    constructorArguments: [nftMarketAddress],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
