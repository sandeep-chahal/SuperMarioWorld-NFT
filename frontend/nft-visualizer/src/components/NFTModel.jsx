import React from "react";
import { ProgressBar } from "@/components/ProgressBar";

export const NFTModel = ({ nft, closeModal }) => {
	return (
		// Modal background
		<div
			role="dialog"
			className=" fixed flex items-center z-50 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-50"
		>
			{/* Modal */}
			<div className="relative m-auto w-11/12 md:w-auto lg:w-[900px] h-4/5 lg:h-auto scroll-bar-2 overflow-auto bg-white rounded-3xl p-5">
				{/* Grid */}
				<div className="inline-grid grid-col-1 lg:grid-cols-2 gap-10">
					{/* NFT Image */}
					<div
						className="block w-full h-48 lg:h-96 bg-center bg-cover rounded-xl m-auto"
						style={{ backgroundImage: `url(${nft.image})` }}
					/>
					{/* NFT Content */}
					<div className="text-gray-800 h-full w-full md:w-96 lg:w-full lg:h-96 lg:overflow-auto scroll-bar-2 pr-2">
						<h1 className="m-0 font-bold text-3xl">{nft.name}</h1>
						<p className="mb-4">You own {nft.amount} copies</p>
						<h3 className="mt-1 mb-1 font-bold text-lg">Description</h3>
						<p className="mb-4">{nft.description}</p>
						<h3 className="mt-1 mb-1 font-bold text-lg">Attribute</h3>
						<div className="">
							{nft.attributes
								? nft.attributes.map((attribute, i) => (
										<div key={i}>
											<div className="mt-2 mb-1">
												{/* Trait Type */}
												<div className="text-gray-800 inline">
													{attribute.trait_type}
												</div>
												<div className="float-right">{attribute.value}</div>
												{attribute.value <= 10 && (
													<ProgressBar
														className="mt-1"
														percentage={attribute.value * 10}
													/>
												)}
											</div>
										</div>
								  ))
								: null}
						</div>
					</div>
				</div>
				{/* Close Button */}
				<span
					onClick={closeModal}
					className="absolute top-0 right-0 pt-2 pl-5 pr-6 text-xl font-bold cursor-pointer"
				>
					&times;
				</span>
			</div>
		</div>
	);
};
