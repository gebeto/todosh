import React from 'react';

import { Modal, ModalPosition } from '@wsl/shared/components/Modal';
import { List } from '@wsl/shared/components/List';
import { useToggle } from '@wsl/shared/hooks/useToggle';
import { TasksList, useToDoClient } from '../../api';
import { useRefresh } from '../../pages/Shopping/RefreshContext';


export const SelectListModal: React.FC<any> = ({ open, handleClose }) => {
	const client = useToDoClient();
	const [items, setItems] = React.useState<TasksList[]>([]);

	React.useEffect(() => {
		if (!open) return;

		client?.getLists().then(lists => {
			console.log(lists);
			setItems(lists.value);
		});
	}, [open]);

	const handleItemSelect = (item: TasksList) => {
		client?.setTodoTaskListId(item.id, item.displayName);
		window.location.reload();
	}

	return (
		<Modal position={ModalPosition.center} open={open} handleClose={handleClose}>
			<List
				items={items}
				titleKey="displayName"
				onItemSelect={handleItemSelect}
			/>
		</Modal>
	);
}


export const ListTitle: React.FC<any> = (props) => {
	const [open, handleOpen, handleClose] = useToggle();
	const client = useToDoClient();
	
	return (
		<React.Fragment>
			<h1 onClick={handleOpen}>{client?.todoTaskListTitle || props.children}</h1>
			<SelectListModal open={open} handleClose={handleClose} />
		</React.Fragment>
	);
}
