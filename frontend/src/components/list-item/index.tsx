import * as React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { toggleIsCompleted } from '../../store/tasks';
import { ITask } from '../../api/';

import './styles.scss';


const listItemTransitionClassNames: any = {
	appear: "list-item",
	enterActive: "list-item-completed-active",
	enterDone: "list-item-completed",
	exitActive: "list-item-uncompleted-active",
	exitDone: "list-item-uncompleted",
}


interface ItemProps {
	taskId: any;
	data: ITask;
	toggleChecked: (task: ITask, isCompleted: boolean) => void;
}


export const ListItemRaw = ({ data, toggleChecked }: ItemProps) => {
	const [ completed, setCompleted ] = React.useState(!!data.completedDateTime);

	const handleClick = React.useCallback(() => {
		toggleChecked(data, !completed);
	}, [data, completed, data.completedDateTime]);

	return (
		<CSSTransition
			classNames={listItemTransitionClassNames}
			in={!!data.completedDateTime}
			timeout={300}
		>
			<li onClick={handleClick} className="list-item">
				<div className="list-item-check"></div>
				<div className="list-item-title">{data.subject}</div>
			</li>
		</CSSTransition>
	)
}


export const ListItem = connect(
	(state: any, ownProps: any) => ({
		data: state.tasks.byId[ownProps.taskId],
	}),
	(dispatch: any) => ({
		toggleChecked(task: ITask) {
			dispatch(toggleIsCompleted(task));
		},
	}),
)(ListItemRaw);