
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
 const contract_address = "0xA3D4638F0B592aBEBdbCF34125dF4F5DaaB23e8a";
 const rpc= new ethers.providers.JsonRpcBatchProvider(process.env.GOERLI_URL);

 const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, rpc)
 const soulBound = await ethers.getContractAt("SoulBound", contract_address, wallet);
 const mint = await soulBound.safeMint(wallet.address);
 await mint.wait();
 console.log(mint.hash);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
