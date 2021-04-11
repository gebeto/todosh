import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { tasks, selctorTaskById } from '../../store/tasks';
import { TaskId, TaskStatus, useToDoClient } from '../../api';
import { FadeTransition } from './FadeTransition';
import { CompletedTransition } from './CompletedTransition';

import './styles.scss';


const taskItemTransitionClassNames: any = {
	appear: "task-list-item",
	enterActive: "task-list-item-completed-active",
	enterDone: "task-list-item-completed",
	exitActive: "task-list-item-uncompleted-active",
	exitDone: "task-list-item-uncompleted",
}


export type TaskItemProps = {
	taskId: TaskId;
	index: number;
}


export const TaskItem = ({ taskId, index }: TaskItemProps) => {
	const task = useSelector(state => selctorTaskById(state, taskId));
	const client = useToDoClient();
	const dispatch = useDispatch();
	const completed = React.useMemo(() => task.status === TaskStatus.completed, [task.status]);

	const handleClick = () => {
		dispatch(
			tasks.actions.updated({
				...task,
				status: completed ? TaskStatus.notStarted : TaskStatus.completed,
			})
		);
		if (completed) {
			client?.uncompleteTask(task.id).then(updatedTask => {
				dispatch(tasks.actions.updated(updatedTask));
			});
		} else {
			client?.completeTask(task.id).then(updatedTask => {
				dispatch(tasks.actions.updated(updatedTask));
			});
		}
	};

	return (
		<FadeTransition delay={task.newlyAdded ? 0 : index * 70}>
			<CompletedTransition completed={completed}>
				<li onClick={handleClick} className="task-list-item">
					<div className="task-list-item-check" />
					<div className="task-list-item-title">{task.title}</div>
				</li>
			</CompletedTransition>
		</FadeTransition>
	)
}
