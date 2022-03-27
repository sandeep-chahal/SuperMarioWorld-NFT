import React from "react";

export const ProgressBar = ({ percentage, className }) => {
	return (
		<div className={`rounded-md bg-gray-300 w-full h-2 ${className}`}>
			<div
				style={{ width: percentage + "%" }}
				className="rounded-md h-full bg-emerald-700"
			></div>
		</div>
	);
};
