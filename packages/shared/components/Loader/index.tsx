import React from 'react';


export type LoaderProps = {
	size: number;
}


export const Loader: React.FC<LoaderProps> = ({ size = 100 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<circle cx="50" cy="50" fill="none" stroke="#111" strokeWidth="20" r="40" strokeDasharray="188.49555921538757 64.83185307179586">
				<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
			</circle>
		</svg>
	);
}
