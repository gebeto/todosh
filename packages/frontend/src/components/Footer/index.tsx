import * as React from 'react';

import { useTransition } from '../../hooks/useTransition';
import { useFocus } from '../../hooks/useFocus';

import { TaskModal } from '../TaskModal';
import './styles.scss';


export const Footer: React.FC = () => {
	const [ isOpened, setIsOpened ] = React.useState(false);

	const transitionState = useTransition("exited", isOpened, 500);
	const [ ref, setFocus ] = useFocus() as any;

	const handleOpen = React.useCallback(() => {
		setIsOpened(true);
		setFocus();
	}, [])

	const handleClose = React.useCallback(() => {
		setIsOpened(false);
	}, [])

	return (
		<React.Fragment>
			<div className="create-task">
				<div className="container">
					<div onClick={handleOpen} className="create-task-input">Add item to list</div>
				</div>
			</div>
			<TaskModal
				transitionState={transitionState}
				handleClose={handleClose}
				ref={ref}
			/>
		</React.Fragment>
	)
}
