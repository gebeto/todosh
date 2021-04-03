import * as React from 'react';
import './styles.scss';

import { Flyout } from '@wsl/shared/components/Flyout';
import { List } from '@wsl/shared/components/List';
import { useToggle } from '@wsl/shared/hooks/useToggle';

import { useRefresh } from '../../pages/Shopping/RefreshContext';
import logoutIcon from 'url:./settings-icon.svg';

import { ListTitle } from './ListTitle';


export const Header: React.FC = () => {
	const [open, handleOpen, handleClose] = useToggle();
	const refresh = useRefresh();

	const handleLogout = React.useCallback(() => {
		localStorage.clear();
		window.location.reload();
	}, []);

	const onItemSelect = (item: any) => {
		item.callback?.();
	}

	return (
		<div className="header">
			<div className="container header-container">
				<ListTitle>List</ListTitle>
				<img src={logoutIcon} height="26" onClick={handleOpen} />
			</div>
			<Flyout title="Settings" open={open} handleClose={handleClose}>
				<List onItemSelect={onItemSelect} items={[
					{ id: 1, title: "Refresh", callback: refresh },
					{ id: 2, title: "Logout", callback: handleLogout },
				]} />
			</Flyout>
		</div>
	)
}
