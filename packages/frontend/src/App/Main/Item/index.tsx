import * as React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { setIsCompleted } from '../../store';

import './styles.scss';

import { WTask } from '../../Wunderlist';


const listItemTransitionClassNames: any = {
	appear: "list-item",
	enterActive: "list-item-completed-active",
	enterDone: "list-item-completed",
	exitActive: "list-item-uncompleted-active",
	exitDone: "list-item-uncompleted",
}


interface ItemProps {
	taskId: any;
	data: WTask;
	toggleChecked: (task: WTask) => void;
}


const Item = ({ data, toggleChecked }: ItemProps) => {
	const handleClick = React.useCallback(() => {
		toggleChecked(data);
	}, [data]);

	return (
		<CSSTransition
			appear={data.completed}
			classNames={listItemTransitionClassNames}
			in={data.completed}
			timeout={300}
		>
			<li onClick={handleClick} className="list-item">
				<div className="list-item-check"></div>
				<div className="list-item-title">{data.title}</div>
			</li>
		</CSSTransition>
	)
}


export default connect(
	(state: any, ownProps: any) => ({
		data: state.byId[ownProps.taskId],
	}),
	(dispatch: any) => ({
		toggleChecked(task: WTask) {
			dispatch(setIsCompleted(task, !task.completed));
		},
	}),
)(Item);