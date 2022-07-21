const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("test", async accounts => {

  it("should set user to Bob", async () => {
    // Get initial balances of first and second account.
    const Alice = accounts[0];
    const Bob = accounts[1];

    const ERC4907Demo = await ethers.getContractFactory("ERC4907Demo");
    const demo = await ERC4907Demo.deploy("John", "TestJOHN");
    await demo.deployed();

    await demo.mint(1, Alice);
    let expires = Math.floor(new Date().getTime() / 1000) + 1000;
    await demo.setUser(1, Bob, BigInt(expires));

    let user_1 = await demo.userOf(1);

    expect(user_1).to.equal(Bob);
    assert.equal(
      user_1,
      Bob,
      "User of NFT 1 should be Bob"
    );

    let owner_1 = await demo.ownerOf(1);
    assert.equal(
      owner_1,
      Alice,
      "Owner of NFT 1 should be Alice"
    );
  });
});