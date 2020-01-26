import * as React from 'react';
import './styles.scss';

import settingsIcon from './settings-icon.svg';


const Header = (props: any) => {
	const handleLogout = React.useCallback(() => {
		localStorage.clear();
		window.location.reload();
	}, []);

	return (
		<div className="header">
			<h1>List</h1>
			<img src={settingsIcon} height="28" onClick={handleLogout} />
		</div>
	)
}


export default Header;
