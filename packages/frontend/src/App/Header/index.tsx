import * as React from 'react';

import settingsIcon from './settings-icon.svg';


export const Header = () => (
	<div className="header">
		<h1>List</h1>
		<img src={settingsIcon} height="28" />
	</div>
)
