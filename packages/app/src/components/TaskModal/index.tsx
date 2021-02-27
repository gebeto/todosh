import * as React from 'react';
import { useDispatch } from 'react-redux';

import { TaskStatus, useToDoClient } from '../../api';
import { todoTaskListId } from '../../api';

import { tasks } from '../../store/tasks';
import { tasksCompleted } from '../../store/tasks-completed';
import { useDocumentEvent } from '../../hooks/useDocumentEvent';
import { Autocomplete } from '../Autocomplete';

import './styles.scss';


export const TaskModal: React.FC<any> = React.forwardRef((props: any, inputRef: any) => {
	const client = useToDoClient();
	const dispatch = useDispatch();
	const wrapperRef = React.useRef(null);
	const [value, setValue] = React.useState("");

	const handleSubmitOldItem = (task: any) => {
		dispatch(tasks.actions.added({
			...task,
			newlyAdded: true,
			status: TaskStatus.notStarted,
		}));
		client?.uncompleteTask(task.id).then(updatedTask => {
			dispatch(tasksCompleted.actions.deleted(updatedTask.id));
			dispatch(tasks.actions.updated(updatedTask));
		});
	}

	const handleSubmitItem = async (text: string) => {
		const task = await client?.createTask(todoTaskListId, text);
		if (task) {
			dispatch(tasks.actions.added(task));
		}
	}

	const handleModalClose = React.useCallback(() => {
		inputRef.current.blur();
		props.handleClose();
		setTimeout(() => {
			setValue("");
		}, 300);
	}, []);

	const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const handleWrapperClick = React.useCallback((e: React.MouseEvent) => {
		if (e.target === wrapperRef.current) {
			handleModalClose();
		}
	}, []);

	const handleFormSubmit = React.useCallback((e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		handleSubmitItem(value);
		handleModalClose();
		return false;
	}, [value]);

	const handleSubmitOldTask = React.useCallback((task: any) => {
		inputRef.current.blur();
		setTimeout(() => {
			handleSubmitOldItem(task);
		}, 250);
		handleModalClose();
		return false;
	}, [value]);

	useDocumentEvent<KeyboardEvent>("keydown", (e) => {
		if (e.key === "Escape") {
			handleModalClose()
		}
	});

	return (
		<form
			ref={wrapperRef}
			onClick={handleWrapperClick}
			onSubmit={handleFormSubmit}
			className={`inputter ${props.transitionState}`}
		>
			<div className="inputter-input-wrapper">
				<input ref={inputRef} type="text" value={value} onChange={handleInputChange} />
				<Autocomplete onSelect={handleSubmitOldTask} value={value} />
			</div>
		</form>
	);
});
