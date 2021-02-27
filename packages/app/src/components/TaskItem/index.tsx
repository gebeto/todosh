import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { tasks, selctorTaskById } from '../../store/tasks';
import { TaskId, TaskStatus, useToDoClient } from '../../api';
import { Fade } from './Fade';

import './styles.scss';
import { compileFunction } from 'vm';


const taskItemTransitionClassNames: any = {
	appear: "list-item",
	enterActive: "list-item-completed-active",
	enterDone: "list-item-completed",
	exitActive: "list-item-uncompleted-active",
	exitDone: "list-item-uncompleted",
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
		<Fade delay={task.newlyAdded ? 0 : index * 70}>
			<CSSTransition classNames={taskItemTransitionClassNames} in={completed} timeout={300}>
				<li onClick={handleClick} className="list-item">
					<div className="list-item-check" />
					<div className="list-item-title">{task.title}</div>
				</li>
			</CSSTransition>
		</Fade>
	)
}
