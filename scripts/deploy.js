const hre = require("hardhat");

async function main() {
    const DefiAddress = "0x5D5e53C390d7aD15eFde74A7881720d3f13e8638"; // Defi contract address
    const TweetsAddress = "0xbc48Da7E1DCa526FFd7c661e037b96D851b294A6"; // Tweets contract address

    const NFTandDefiMerged = await hre.ethers.getContractFactory("NFTandDefiMerged");
    const contract = await NFTandDefiMerged.deploy(DefiAddress, TweetsAddress);
    await contract.deployed();

    console.log("NFTandDefiMerged contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});