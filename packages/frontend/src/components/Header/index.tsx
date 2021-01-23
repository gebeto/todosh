import * as React from 'react';
import './styles.scss';

import { useRefresh } from '../../pages/Shopping/RefreshContext';
import logoutIcon from 'url:./settings-icon.svg';


export const Header: React.FC = () => {
	const refresh = useRefresh();

	const handleLogout = React.useCallback(() => {
		localStorage.clear();
		window.location.reload();
	}, []);

	const handleRefresh = () => {
		refresh();
	}

	return (
		<div className="header">
			<div className="container header-container">
				<h1 onClick={handleRefresh}>List</h1>
				<img src={logoutIcon} height="26" onClick={handleLogout} />
			</div>
		</div>
	)
}
