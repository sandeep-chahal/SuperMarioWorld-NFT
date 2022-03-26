const { ethers } = require("hardhat");

async function main() {
	const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldCollection");
	const superMarioWorld = await SuperMarioWorld.deploy(
		"SuperMarioWorldCollection",
		"SMWC",
		"https://gateway.pinata.cloud/ipfs/QmTc7BsWzPRbGLUfZftEMFpDtfsJJjenw1x4uo77fWXsbv/"
	);
	await superMarioWorld.deployed();
	console.log("SuperMarioWorldOZ Contract Address", superMarioWorld.address);

	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);

	console.log("Minted Successfully");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
