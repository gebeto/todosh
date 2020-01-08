import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../../Wunderlist';


interface ButtonProps {
}

const Button = ({  }: ButtonProps) => {
	return (
		<button className="list-item list-item-button">Add</button>
	)
}


export default Button;