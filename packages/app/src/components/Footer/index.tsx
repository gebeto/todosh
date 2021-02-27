import * as React from 'react';

import { useFocus } from '@wsl/shared/hooks/useFocus';
import { TasksAutocomplete } from '../TasksAutocomplete';

import './styles.scss';


export const Footer: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [inputRef, focus] = useFocus<HTMLInputElement>();

	const handleOpen = React.useCallback(() => {
		setOpen(true);
		focus();
	}, []);

	const handleClose = React.useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<React.Fragment>
			<div className="create-task">
				<div className="container">
					<div onClick={handleOpen} className="create-task-input">Add item to list</div>
				</div>
			</div>
			<TasksAutocomplete
				handleClose={handleClose}
				inputRef={inputRef}
				open={open}
			/>
		</React.Fragment>
	)
}
