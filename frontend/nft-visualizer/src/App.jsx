import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { NFTCard } from "@/components/NFTCard";
import { NFTModel } from "./components/NFTModel";

import { connect } from "./utils";
const _nft = {
	name: "Mario",
	symbol: "MRWO",
	description: "Hey,I'm Mario",
	image: "https://picsum.photos/500",
	amount: 10,
};

import SuperMarioWorldCollection from "/public/artifacts/contracts/SuperMarioWorldCollection.sol/SuperMarioWorldCollection.json";

function App() {
	const [selectedNFT, setSelectedNFT] = useState(null);
	const [nfts, setNfts] = useState([]);

	useEffect(() => {
		connect()
			.then((account) => {
				getNfts(account);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const getNfts = async (address) => {
		// mumbai polygon rpc
		const rpc = "https://rpc-mumbai.maticvigil.com/";
		const etherProvider = new ethers.providers.JsonRpcProvider(rpc);

		const abi = SuperMarioWorldCollection.abi;

		const nftContract = new ethers.Contract(
			"0x78c36131ffc2ffb19eacbd50915f12fcffb093f1",
			abi,
			etherProvider
		);

		const numOfNfts = (await nftContract.tokenCount()).toNumber();
		console.log("Number of NFTS", numOfNfts);
		const symbol = await nftContract.symbol();
		console.log("Symbol", symbol);

		const accounts = Array(numOfNfts).fill(address);
		const ids = Array.from({ length: 8 }, (_, i) => ++i);

		const amounts = await nftContract.balanceOfBatch(accounts, ids);

		const baseUri = await nftContract.baseUri();
		console.log("base uri", baseUri);

		const metadata = await Promise.all(
			amounts.map(async (amount, i) => {
				const res = await axios.get(`${baseUri}${i + 1}.json`);
				const data = res.data;
				data.amount = amount.toNumber();
				data.symbol = symbol;
				console.log(`metadata loaded for ${i + 1} number nft`);
				return data;
			})
		);
		console.log("NFTs Loaded", metadata);
		setNfts(metadata);
	};

	return (
		<div className="w-3/4 max-w-6xl m-auto mt-14">
			<h1 className="m-0 text-gray-800 text-center font-bold text-3xl">
				Super Mario World Collection
			</h1>
			<h4 className="mt-0 text-gray-500 text-center font-bold text-sm">
				The rarest and most valuable NFT in the world!
			</h4>
			<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 mt-5">
				{nfts.map((nft, i) => (
					<NFTCard key={i} nft={nft} onClick={() => setSelectedNFT(i)} />
				))}
			</div>
			{selectedNFT !== null && (
				<NFTModel
					nft={nfts[selectedNFT]}
					closeModal={() => setSelectedNFT(null)}
				></NFTModel>
			)}
		</div>
	);
}

export default App;
