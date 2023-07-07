const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favourite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    //assert
    //expect
    assert.equal(currentValue.toString(), expectedValue); 
    // expect(currentValue.toString()).to.equal(expectedValue)
  });

  //it.only or use --grep unique_keyword
  it("should update when we call store", async function () {
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "7"

    assert.equal(currentValue.toString(), expectedValue); 
  });

  
});
