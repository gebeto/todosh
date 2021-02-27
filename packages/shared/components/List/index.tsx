import * as React from 'react';

import './styles.scss';


export const ListItem: React.FC<any> = (props) => (
	<li
		className="wsl-list-item"
		onClick={props.onItemSelect ? () => props.onItemSelect(props.item) : props.onItemSelect}
	>
		{props.item.title}
	</li>
);


export const List: React.FC<any> = (props) => {
	return (
		<ul className="wsl-list">
			{props.items.map((item: any) =>
				<ListItem key={item.id} item={item} onItemSelect={props.onItemSelect} />
			)}
		</ul>
	);
};
