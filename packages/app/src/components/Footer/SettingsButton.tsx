import * as React from 'react';
import './styles.scss';

import { Flyout } from '@wsl/shared/components/Flyout';
import { List } from '@wsl/shared/components/List';
import { useToggle } from '@wsl/shared/hooks/useToggle';

import { useRefresh } from '../../pages/Shopping/RefreshContext';
import logoutIcon from 'url:./settings-icon.svg';


export const SettingsButton = () => {
	const [open, handleOpen, handleClose] = useToggle();
	const refresh = useRefresh();

	const handleLogout = React.useCallback(() => {
		localStorage.clear();
		window.location.reload();
	}, []);

	const openDocs = () => {
		window.location.pathname = "/docs/"
	};

	const onItemSelect = (item: any) => {
		item.callback?.();
		handleClose();
	}

	return (
		<React.Fragment>
			<img src={logoutIcon} height="26" onClick={handleOpen} />
			<Flyout title="Settings" open={open} handleClose={handleClose}>
				<List onItemSelect={onItemSelect} items={[
					{ id: 1, title: "Refresh", callback: refresh },
					{ id: 2, title: "Docs", callback: openDocs },
					{ id: 3, title: "Logout", callback: handleLogout },
				]} />
			</Flyout>
		</React.Fragment>
	);
}
