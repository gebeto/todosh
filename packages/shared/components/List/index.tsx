import * as React from 'react';

import './styles.scss';


export const ListItem: React.FC<any> = ({ item, titleKey, onItemSelect }) => (
	<li
		className="wsl-list-item"
		onClick={onItemSelect ? () => onItemSelect(item) : onItemSelect}
	>
		{item[titleKey]}
	</li>
);


export const List: React.FC<any> = ({ items, onItemSelect, titleKey="title" }) => {
	return (
		<ul className="wsl-list">
			{items.map((item: any) =>
				<ListItem key={item.id} item={item} titleKey={titleKey} onItemSelect={onItemSelect} />
			)}
		</ul>
	);
};
