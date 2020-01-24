import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../../../Wunderlist';


interface ItemProps {
	data: WTask;
}

const Item = ({ data }: ItemProps) => {
	return (
		<li className="list-item">
			<div className="list-item-check"></div>
			{ data.title }
		</li>
	)
}


export default Item;