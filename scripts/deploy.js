// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
	const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorld1155");
	const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorld1155", "SMW15");
	await superMarioWorld.deployed();
	console.log("SuperMarioWorldOZ Contract Address", superMarioWorld.address);

	await superMarioWorld.mint(10, "https://ipfs.io/ipfs/QmPexkm2AzD32hZ1Yvrgdrzh81DbZ36pxRkR8xnmZnar5B");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
