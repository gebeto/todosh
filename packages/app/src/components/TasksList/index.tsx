import * as React from 'react';
import { useSelector } from 'react-redux';
import { selctorTasksIds } from '../../store/tasks';

import { TaskItem } from './Item';
import './styles.scss';


export const TasksList: React.FC = () => {
	const tasksIds = useSelector(selctorTasksIds);

	return (
		<div className="container">
			<ul className="task-list">
				{tasksIds.map((taskId: any, index: number) => (
					<TaskItem key={taskId} index={index} taskId={taskId} />
				))}
			</ul>
		</div>
	)
}
