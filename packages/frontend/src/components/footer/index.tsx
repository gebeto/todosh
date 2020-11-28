import * as React from 'react';
import { useDispatch } from 'react-redux';

import './styles.scss';

import { tasks } from '../../store/tasks';
import { tasksCompleted } from '../../store/tasks-completed';
import { TaskModal } from '../TaskModal';

import { useTransition } from '../../hooks/use-transition';
import { useFocus } from '../../hooks/useFocus';
import { todoTaskListId } from '../../api';
import { useToDoClient } from '../../api/ToDoClientContext';


export const Footer: React.FC = () => {
	const client = useToDoClient();
	const dispatch = useDispatch();
	const [ isOpened, setIsOpened ] = React.useState(false);

	const transitionState = useTransition("exited", isOpened, 500);
	const [ ref, setFocus ] = useFocus() as any;

	const handleSubmitItem = async (text: string) => {
		const task = await client?.createTask(todoTaskListId, text);
		if (task) {
			dispatch(tasks.actions.added(task));
		}
	}

	const handleSubmitOldItem = (task: any) => {
		dispatch(tasks.actions.added({...task, newlyAdded: true}));
		client?.uncompleteTask(task.id).then(task => {
			dispatch(tasksCompleted.actions.deleted(task.id));
			dispatch(tasks.actions.updated(task));
		});
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
