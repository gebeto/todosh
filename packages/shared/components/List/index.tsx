import * as React from 'react';

import './styles.scss';


export type ListItemProps<T> = {
	item: T;
	titleKey: keyof T;
	onItemSelect: (item: T) => void;
};


export function ListItem<T>({ item, titleKey, onItemSelect }: ListItemProps<T>) {
	return (
		<li
			className="wsl-list-item"
			onClick={onItemSelect ? () => onItemSelect(item) : onItemSelect}
		>
			{item[titleKey]}
		</li>
	);
}


export type ListProps<T> = {
	items: Array<T>;
	onItemSelect: (item: T) => void;
	titleKey: keyof T;
};


export function List<T>({ items, onItemSelect, titleKey }: ListProps<T>) {
	return (
		<ul className="wsl-list">
			{items.map((item: any) =>
				<ListItem key={item.id} item={item} titleKey={titleKey} onItemSelect={onItemSelect} />
			)}
		</ul>
	);
};

List.defaultProps = {
	titleKey: "title",
}
