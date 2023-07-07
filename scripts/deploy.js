//imports
const { ethers, run, network } = require("hardhat")
require("dotenv").config()

//to delete artifacts folder yarn hardhat clean

//async main{
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage",
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    //private key?
    //rpc url?
    const address = await simpleStorage.getAddress()
    console.log(`Deployed contract to: ${address}`)
    //what happens when we deploy to our hardhat network?    hardhat network is local to our machine
    console.log(network.config)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction.wait(6)
        await verify(address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is : ${currentValue}`)

    //update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is : ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify: verify", {
            address: contractAddress,
            constructorArgument: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(error)
        }
    }
}
//call main
main().then(() =>
    process.exit(0).catch((error) => {
        console.log(error)
        process.exit(1)
    }),
)
