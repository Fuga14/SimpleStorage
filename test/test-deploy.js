const { expect, assert } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage;
  this.beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('Should start with a favorite number of 0', async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';
    // assert.equal(currentValue.toString(), expectedValue);
    expect(currentValue.toString()).to.equal(expectedValue);
  });
  // if run only 1 test it.only use instead
  it('Should update current value to 10, when we call store', async function () {
    const transactionResponse = await simpleStorage.store(10);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '10';
    assert.equal(currentValue.toString(), expectedValue);
  });
});
