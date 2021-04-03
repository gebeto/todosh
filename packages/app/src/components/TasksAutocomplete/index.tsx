import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@wsl/shared/components/Modal';
import { Autocomplete } from '@wsl/shared/components/Autocomplete';

import { TaskStatus, useToDoClient } from '../../api';

import { tasks } from '../../store/tasks';
import { tasksCompleted } from '../../store/tasks-completed';
import { selectorTasksItems } from '../../store/tasks-completed';


export type TasksAutocompleteProps = {
	handleClose: any;
	inputRef: React.RefObject<HTMLInputElement>;
	open: boolean;
};


export const TasksAutocomplete: React.FC<TasksAutocompleteProps> = ({ open, handleClose, inputRef }) => {
	const client = useToDoClient();
	const dispatch = useDispatch();
	const autocompleteTasks = useSelector(selectorTasksItems);

	const onItemSelect = (task: any) => {
		inputRef.current?.blur();
		handleClose();
		setTimeout(() => {
			dispatch(tasks.actions.added({
				...task,
				newlyAdded: true,
				status: TaskStatus.notStarted,
			}));
			client?.uncompleteTask(task.id).then(updatedTask => {
				dispatch(tasksCompleted.actions.deleted(updatedTask.id));
				dispatch(tasks.actions.updated(updatedTask));
			});
		}, 250);
	};

	const onItemCreate = async (text: string) => {
		inputRef.current?.blur();
		handleClose();
		const task = await client?.createTask(text);
		if (task) {
			dispatch(tasks.actions.added(task));
		}
	}

	return (
		<Modal open={open} handleClose={handleClose}>
			<Autocomplete
				defaultValue=""
				inputRef={inputRef}
				items={autocompleteTasks as any[]}
				onItemSelect={onItemSelect}
				onItemCreate={onItemCreate}
			/>
		</Modal>
	);
};
