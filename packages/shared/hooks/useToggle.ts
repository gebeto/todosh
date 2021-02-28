import React from 'react';


export const useToggle = () => {
	const [value, setValue] = React.useState(false);

	const handleOpen = () => {
		setValue(true);
	}

	const handleClose = () => {
		setValue(false);
	}

	return [value, handleOpen, handleClose] as [typeof value, typeof handleOpen, typeof handleClose];
}
