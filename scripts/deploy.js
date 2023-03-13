/*
  hardhat localhost node
  09:26:54
*/

const hre = require('hardhat'); // Hardhat runtime enviroment
const run = require('hardhat');
const network = require('hardhat');

async function main() {
  const simpleStorageFactory = await hre.ethers.getContractFactory(
    'SimpleStorage'
  );
  console.log('Deploying contract...');
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  // rpc url and privat key already build-in in hardhat

  console.log(`Deployed contract to: ${simpleStorage.address}`);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  // Interacting with smart contract
  let currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  currentValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${currentValue}`);
}

async function verify(contractAddress, args) {
  console.log('Veryfying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
