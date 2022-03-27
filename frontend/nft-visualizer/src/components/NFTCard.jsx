import React from "react";

export const NFTCard = ({ nft, ...rest }) => {
	return (
		<div
			className="w-48 h-64 m-auto rounded-xl p-0 cursor-pointer shadow-xl"
			{...rest}
		>
			<div
				className="block w-48 h-48 bg-center bg-cover rounded-xl m-auto"
				style={{ backgroundImage: `url(${nft.image})` }}
			/>
			<div className="m-1 text-gray-600">
				<div className="text-xs ">{nft.symbol}</div>
				<div className="text-xs font-bold inline">{nft.name}</div>
				<div className="text-xs font-bold inline float-right">
					x{nft.amount}
				</div>
			</div>
		</div>
	);
};
