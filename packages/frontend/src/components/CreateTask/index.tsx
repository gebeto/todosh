import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../../Wunderlist';


interface CreateTaskProps {
}


const CreateTask = ({  }: CreateTaskProps) => {
	return (
		<div className="create-task">
			<input
				type="text"
				name="task"
				className="create-task-input"
				placeholder="Add item to list"
			/>
		</div>
	)
}


export default CreateTask;