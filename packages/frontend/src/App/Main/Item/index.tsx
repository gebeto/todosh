import * as React from 'react';
import { connect } from 'react-redux';
import { setIsCompleted } from '../../store';

import './styles.scss';

import { WTask } from '../../Wunderlist';


interface ItemProps {
	taskId: any;
	data: WTask;
	toggleChecked: (task: WTask) => void;
}

const ifElse = (condition: any, e: any, t: any, f: any) => condition === undefined ? e : condition ? t : f;

const Item = ({ data, toggleChecked }: ItemProps) => {
	const [ itemClassName, setItemClassName ] = React.useState('');

	const handleClick = React.useCallback(() => {
		toggleChecked(data);
	}, [data]);

	React.useEffect(() => {
		setItemClassName(ifElse(data.completed, '', ' list-item-completed', ' list-item-uncompleted'));
	}, [data.completed]);

	return (
		<li onClick={handleClick} className={`list-item${itemClassName}`}>
			<div className="list-item-check"></div>
			{ data.title }
		</li>
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