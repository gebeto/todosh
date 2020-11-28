import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { tasks, selctorTaskById } from '../../store/tasks';
import { TaskId, useToDoClient } from '../../api';
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
	const completed = React.useMemo(() => !!task.completedDateTime, [task.completedDateTime]);

	const handleClick = () => {
		const completed = !!task.completedDateTime;
		dispatch(
			tasks.actions.updated({
				...task,
				completedDateTime: completed ? null : (new Date()).toISOString(),
			})
		);
		if (completed) {
			client?.uncompleteTask(task.id).then(task => {
				dispatch(tasks.actions.updated(task));
			});
		} else {
			client?.completeTask(task.id).then(task => {
				dispatch(tasks.actions.updated(task));
			});
		}
	};

	return (
		<CSSTransition classNames={taskItemTransitionClassNames} in={completed} timeout={300}>
			<Fade offset={task.newlyAdded ? 0 : index * 70}>
				<li onClick={handleClick} className="list-item">
					<div className="list-item-check" />
					<div className="list-item-title">{task.title}</div>
				</li>
			</Fade>
		</CSSTransition>
	)
}
