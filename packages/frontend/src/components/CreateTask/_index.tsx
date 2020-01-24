import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../../Wunderlist';
import { addNewTask } from '../../store';
import TaskModal from './TaskModal';


interface CreateTaskProps {
}


const CreateTask = (props: CreateTaskProps) => {
	const [ isOpened, setIsOpened ] = React.useState(false);

	const handleOpen = React.useCallback(() => {
		setIsOpened(true);
	}, [])

	const handleClose = React.useCallback(() => {
		setIsOpened(false);
	}, [])

	return (
			// <div onClick={handleOpen} className="create-task-input">Add item to list</div>
		<div className="create-task">
			<input
				onClick={handleOpen}
				className="create-task-input"
				type="text"
				placeholder="Add item to list"
			/>
			<TaskModal
				isOpened={isOpened}
				handleClose={handleClose}
				onSubmit={props.handleSubmitItem}
			/>
		</div>
	)
}


export default connect(
	(state) => ({

	}),
	(dispatch) => ({
		handleSubmitItem(itemText) {
			dispatch(addNewTask(itemText))
		}
	})
)(CreateTask);
