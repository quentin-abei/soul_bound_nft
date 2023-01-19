const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoulBound", function () {
  async function deployContractAndSetVariables() {
    const SoulBound = await ethers.getContractFactory("SoulBound");
    const soulBound = await SoulBound.deploy();
    const signer = ethers.provider.getSigner(0);
    //const address = await signer.getAddress();

    return { soulBound, signer };
  }
  it("Mint one nft if account is owner", async function () {
    const { soulBound, signer } = await loadFixture(
      deployContractAndSetVariables
    );
      const wallet = new ethers.Wallet.createRandom().connect(ethers.provider);
      console.log(wallet.address);
      await expect(soulBound.connect(signer).safeMint(wallet.address)).not.to.be.reverted;

  });
  it("Should revert if account is not owner", async function () {
    const { soulBound, signer } = await loadFixture(
      deployContractAndSetVariables
    );
      const wallet = new ethers.Wallet.createRandom().connect(ethers.provider);
      console.log(wallet.address);
      await signer.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("1"),
      })
      await expect(soulBound.connect(wallet).safeMint(wallet.address)).to.be.reverted;

  });
});