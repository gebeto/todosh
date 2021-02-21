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
	return (
		<ul className="autocomplete">
			{items.map((item: any) =>
				<AutocompleteItem key={item.id} data={item} onSelect={onSelect} />
			)}
		</ul>
	);
};
