import * as React from 'react';
import { connect } from 'react-redux';

import { ListItem } from '../list-item/';
import './styles.scss';


interface ListProps {
	tasksIds: string[];
}

export const ListRaw = ({ tasksIds }: ListProps) => {
	return (
		<div className="container">
			<ul className="list">
				{tasksIds.map((taskId: any) => <ListItem key={taskId} taskId={taskId} />)}
			</ul>
		</div>
	)
}

export const List = connect(
	(state: any) => ({
		tasksIds: state.tasks.ids
	}),
)(ListRaw);
