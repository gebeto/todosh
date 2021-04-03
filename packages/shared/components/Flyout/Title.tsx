import React from 'react';


export const FlyoutTitle: React.FC = ({ children }) => {
	return (
		<h2 className="flyout-title">
			{children}
		</h2>
	);
}
