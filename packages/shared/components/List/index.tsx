import * as React from 'react';

import './styles.scss';


export const ListItem: React.FC<any> = ({ item, onItemSelect }) => (
	<li
		className="list-item"
		onClick={onItemSelect ? () => onItemSelect(item) : onItemSelect}
	>
		{item.title}
	</li>
);


export const List: React.FC<any> = ({ onItemSelect, items }: any) => {
	return (
		<ul className="list">
			{items.map((item: any) =>
				<ListItem key={item.id} item={item} onItemSelect={onItemSelect} />
			)}
		</ul>
	);
};
