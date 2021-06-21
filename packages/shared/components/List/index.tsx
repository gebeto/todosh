import * as React from 'react';
import { Loader } from '../Loader';

import './styles.scss';


export type ListItemProps<T> = {
	item: T;
	titleKey: keyof T;
	onItemSelect: (item: T) => void;
};

const LIST_ITEM_HEIGHT = 44;

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
	minListItemsCount?: number;
	maxListItemsCount?: number;
	loading?: boolean;
};


export function List<T>({ items, onItemSelect, titleKey, minListItemsCount = 0, maxListItemsCount = 0, loading = false }: ListProps<T>) {
	const minHeightStyles = React.useMemo(() => ({
		minHeight: `${minListItemsCount * LIST_ITEM_HEIGHT}pt`,
		...(maxListItemsCount ? {maxHeight: `${maxListItemsCount * LIST_ITEM_HEIGHT}pt`} : null),
		overflow: 'auto',
	}), [minListItemsCount, maxListItemsCount]);

	if (loading) {
		return (
			<div className="wsl-list" style={{...minHeightStyles, display: "flex", alignItems: "center", justifyContent: "center"}}>
				<Loader size={40} />
			</div>
		);
	}

	return (
		<ul className="wsl-list" style={minHeightStyles}>
			{items.map((item: any) =>
				<ListItem key={item.id} item={item} titleKey={titleKey} onItemSelect={onItemSelect} />
			)}
		</ul>
	);
};

List.defaultProps = {
	titleKey: "title",
}
