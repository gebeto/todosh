import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../../Wunderlist';
import { addNewTask } from '../../store';


const prevent = e => {
	e.preventDefault();
	e.stopPropagation();
}


interface CreateTaskProps {
}


const CreateTask = (props: CreateTaskProps) => {
	const [ isOpened, setIsOpened ] = React.useState(false);
	const [ value, setValue ] = React.useState("");

	const ref = React.useRef(null);

	const handleOpen = React.useCallback((e) => {
		prevent(e);
		setIsOpened(true);
		return false;
	}, []);

	const handleClose = React.useCallback((e) => {
		prevent(e);
		setIsOpened(false);
	}, []);

	const handleValueChange = React.useCallback((e) => {
		setValue(e.target.value);
	}, []);

	const handleSubmit = React.useCallback((e) => {
		prevent(e);
		setIsOpened(false);
		props.handleCreateTask(value);
		setValue("");
		ref.current.blur();
	}, [value]);


	return (
		<form className="create-task" onSubmit={handleSubmit}>
			<input
				ref={ref}
				placeholder="Add item to list"
				className="create-task-input"
				onChange={handleValueChange}
				value={value}
				name="task"
				type="text"
			/>
		</form>
	)
}


export default connect(
	(state) => ({

	}),
	(dispatch) => ({
		handleCreateTask(taskText) {
			dispatch(addNewTask(taskText));
		}
	})
)(CreateTask);
