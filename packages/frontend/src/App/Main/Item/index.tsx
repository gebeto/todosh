import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../../Wunderlist';


interface ItemProps {
	data: WTask;
}

const Item = ({ data }: ItemProps) => {
	const [isChecked, setIsChecked] = React.useState(false);

	const handleClick = React.useCallback(() => {
		setIsChecked(!isChecked);
	}, [isChecked]);

	return (
		<li onClick={handleClick} className={`list-item${isChecked ? ' list-item-completed' : ''}`}>
			<div className="list-item-check"></div>
			{ data.title }
		</li>
	)
}


export default Item;