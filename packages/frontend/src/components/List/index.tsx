import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../../Wunderlist';
import Item from '../Item/';
import AddButton from '../AddButton/';

interface ListProps {
	tasks: WTask[];
}

const List = ({ tasks }: ListProps) => {
	return (
		<ul className="list">
			<AddButton />
			{tasks.map((task: any) => <Item key={task.id} data={task} />)}
		</ul>
	)
}


export default connect(
	(state: any) => ({
		tasks: state.tasks
	}),
)(List);