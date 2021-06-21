import React from 'react';

import { Flyout } from '@wsl/shared/components/Flyout';
import { List } from '@wsl/shared/components/List';
import { useToggle } from '@wsl/shared/hooks/useToggle';
import { TasksList, useToDoClient } from '../../api';


export const SelectListModal: React.FC<any> = ({ open, handleClose }) => {
	const client = useToDoClient();
	const [loading, setLoading] = React.useState(false);
	const [items, setItems] = React.useState<TasksList[]>([]);

	React.useEffect(() => {
		if (!open) return;
		setLoading(true);
		client?.getLists().then(lists => {
			setItems(lists.value);
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}, [open]);

	const handleItemSelect = (item: TasksList) => {
		client?.setTodoTaskListId(item.id, item.displayName);
		window.location.reload();
	}

	return (
		<Flyout title="Default list" open={open} handleClose={handleClose}>
			<List
				items={items}
				loading={loading}
				minListItemsCount={5}
				maxListItemsCount={5}
				titleKey="displayName"
				onItemSelect={handleItemSelect}
			/>
		</Flyout>
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
