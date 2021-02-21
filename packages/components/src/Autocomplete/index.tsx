import * as React from 'react';

import '@wsl/frontend/src/styles.scss';
import './styles.scss';


export const AutocompleteItem: React.FC<any> = (props: any) => (
	<li
		className="autocomplete-item"
		onClick={() => props.onSelect(props.data)}
	>
		{props.data.title}
	</li>
);


export const Autocomplete: React.FC<any> = ({ value, onSelect, items }: any) => {
	const filteredItems = React.useMemo(() => {
		if (value) {
			const reg = new RegExp(value, "i");
			return items.filter(item => reg.exec(item.title));
		}
		return items;
	}, [items, value]);

	return (
		<ul className="autocomplete">
			{filteredItems.map((item: any) =>
				<AutocompleteItem key={item.id} data={item} onSelect={onSelect} />
			)}
		</ul>
	);
};
