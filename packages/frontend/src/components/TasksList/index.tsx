import * as React from 'react';
import { useSelector } from 'react-redux';

import { TaskItem } from '../TaskItem';
import './styles.scss';


export const TasksList: React.FC = () => {
	const tasksIds = useSelector((state: any) => state.tasks.ids);

	return (
		<div className="container">
			<ul className="list">
				{tasksIds.map((taskId: any, index: number) => (
					<TaskItem key={taskId} index={index} taskId={taskId} />
				))}
			</ul>
		</div>
	)
}
