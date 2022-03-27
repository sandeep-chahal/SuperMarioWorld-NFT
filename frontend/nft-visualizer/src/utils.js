import { ethers } from "ethers";

export const connect = async () => {
	try {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		if (!accounts.length) {
			alert("Connect to metamask");
		}
		window.ethereum.on("accountsChanged", () => window.location.reload());

		return accounts[0];
	} catch (err) {
		console.log("-------Connect Function Error-------");
		console.log(err);
	}
};
