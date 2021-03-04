import React from 'react';


export const ModalTitle: React.FC = ({ children }) => {
	return (
		<h2 className="modal-title">
			{children}
		</h2>
	);
}
