import * as React from 'react';
import { useDispatch } from 'react-redux';

import './styles.scss';

import { addNewTask, addOldTask } from '../../store/tasks';
import { tasksCompleted } from '../../store/tasks-completed';
import { TaskModal } from '../TaskModal';

import { useTransition } from '../../hooks/use-transition';
import { useFocus } from '../../hooks/useFocus';


export const Footer: React.FC = () => {
	const dispatch = useDispatch();
	const [ isOpened, setIsOpened ] = React.useState(false);

	const transitionState = useTransition("exited", isOpened, 500);
	const [ ref, setFocus ] = useFocus() as any;

	const handleSubmitItem = (itemText: string) => {
		dispatch(addNewTask(itemText))
	}

	const handleSubmitOldItem = (task: any) => {
		try {
			dispatch(
				addOldTask({
					...task,
					completedDateTime: null,
				})
			);
		} catch (e) {

		}
		dispatch(tasksCompleted.actions.deleted(task.id));
	}

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
				onSubmit={handleSubmitItem}
				onSubmitOldTask={handleSubmitOldItem}
				handleClose={handleClose}
				ref={ref}
			/>
		</React.Fragment>
	)
}
