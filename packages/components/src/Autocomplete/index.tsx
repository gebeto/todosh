import * as React from 'react';

import { List } from '../List';


export type AutocompleteListItemItem = {
	id: number,
	title: string,
}


export type AutocompleteListProps = {
	value: string,
	items: Array<AutocompleteListItemItem>,
	onItemSelect: (item: AutocompleteListItemItem) => void,
};


export const Autocomplete: React.FC<AutocompleteListProps> = ({ value, items, onItemSelect }) => {
	const filteredItems = React.useMemo(() => {
		if (value) {
			const reg = new RegExp(value, "i");
			return items.filter(item => reg.exec(item.title));
		}
		return items;
	}, [items, value]);

	return (
		<List onItemSelect={onItemSelect} items={filteredItems} />
	);
};
