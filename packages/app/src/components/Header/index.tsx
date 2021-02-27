import * as React from 'react';
import './styles.scss';

import { Modal } from '@wsl/shared/components/Modal';
import { List } from '@wsl/shared/components/List';

import { useRefresh } from '../../pages/Shopping/RefreshContext';
import logoutIcon from 'url:./settings-icon.svg';


export const Header: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const refresh = useRefresh();

	const handleLogout = React.useCallback(() => {
		localStorage.clear();
		window.location.reload();
	}, []);

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const onItemSelect = (item: any) => {
		handleClose();
		item.callback?.();
	}

	return (
		<div className="header">
			<div className="container header-container">
				<h1>List</h1>
				<img src={logoutIcon} height="26" onClick={handleOpen} />
			</div>
			<Modal open={open} handleClose={handleClose}>
				<List onItemSelect={onItemSelect} items={[
					{ id: 1, title: "Refresh", callback: refresh },
					{ id: 2, title: "Logout", callback: handleLogout},
				]} />
			</Modal>
		</div>
	)
}
