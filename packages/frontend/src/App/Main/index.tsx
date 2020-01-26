import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../Wunderlist';
import Item from './Item/';

interface ListProps {
	tasksIds: string[];
}

const List = ({ tasksIds }: ListProps) => {
	return (
		<div className="container">
			<ul className="list">
				{tasksIds.map((taskId: any) => <Item key={taskId} taskId={taskId} />)}
			</ul>
		</div>
	)
}


export default connect(
	(state: any) => ({
		tasksIds: state.ids
	}),
)(List);