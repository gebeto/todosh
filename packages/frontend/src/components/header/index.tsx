import * as React from 'react';
import './styles.scss';

import logoutIcon from 'url:./settings-icon.svg';


const Header = (props: any) => {
	const handleLogout = React.useCallback(() => {
		localStorage.clear();
		window.location.reload();
	}, []);

	return (
		<div className="header">
			<div className="container header-container">
				<h1>List</h1>
				<img src={logoutIcon} height="26" onClick={handleLogout} />
			</div>
		</div>
	)
}


export default Header;
