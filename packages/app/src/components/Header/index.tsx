import * as React from 'react';
import './styles.scss';

import { ListTitle } from './ListTitle';


export const Header: React.FC = () => {
	return (
		<div className="header">
			<div className="container header-container">
				<ListTitle>List</ListTitle>
			</div>
		</div>
	)
}
