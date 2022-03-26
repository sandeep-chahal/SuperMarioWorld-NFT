// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
	const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldOZ");
	const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldOZ", "SPMRWO");
	await superMarioWorld.deployed();
	console.log("SuperMarioWorldOZ Contract Address", superMarioWorld.address);

	await superMarioWorld.mint("https://ipfs.io/ipfs/QmWbCTH4aQ4BnKp67f2KWvua5szzuPGL5ME2pH3VBw3iEM");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
