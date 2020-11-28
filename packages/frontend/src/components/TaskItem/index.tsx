import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { toggleIsCompleted } from '../../store/tasks';
import { TaskId } from '../../api';
import { Fade } from './Fade';

import './styles.scss';


const taskItemTransitionClassNames: any = {
	appear: "list-item",
	enterActive: "list-item-completed-active",
	enterDone: "list-item-completed",
	exitActive: "list-item-uncompleted-active",
	exitDone: "list-item-uncompleted",
}


export type TaskItemProps = {
	taskId: TaskId;
	index: any;
}


export const TaskItem = ({ taskId, index }: TaskItemProps) => {
	const task = useSelector((state: any) => state.tasks.byId[taskId]);
	const dispatch = useDispatch();
	const [ completed, setCompleted ] = React.useState(!!task.completedDateTime);

	const handleClick = React.useCallback(() => {
		dispatch(toggleIsCompleted(task));
	}, [task, completed, task.completedDateTime]);

	return (
		<CSSTransition
			classNames={taskItemTransitionClassNames}
			in={!!task.completedDateTime}
			timeout={300}
		>
			<Fade offset={task.newlyAdded ? 300 : index * 70}>
				<li onClick={handleClick} className="list-item">
					<div className="list-item-check" />
					<div className="list-item-title">{task.title}</div>
				</li>
			</Fade>
		</CSSTransition>
	)
}

TaskItem.defaultProps = {
	className: '',
}
