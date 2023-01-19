
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
 const SoulBound = await ethers.getContractFactory("SoulBound");
 const soulBound = await SoulBound.deploy();
 await soulBound.deployed();

 console.log("SoulBound deployed at address :", soulBound.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
