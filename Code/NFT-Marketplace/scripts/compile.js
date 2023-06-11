const hre = require("hardhat");

async function main() {
  await hre.ethers.getContractFactory("NFTMarket");
  await hre.ethers.getContractFactory("NFT");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
