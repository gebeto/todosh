import * as React from 'react';

import { List } from '../List';
import { useAutocomplete } from '../../hooks/useAutocomplete';

import './styles.scss';


export type AutocompleteItem = {
	id: number;
	title: string;
}


export type AutocompleteProps = {
	items: Array<AutocompleteItem>;
	inputRef: React.Ref<HTMLInputElement>;
	defaultValue?: string;
}


export const Autocomplete: React.FC<AutocompleteProps> = (props) => {
	const [value, setValue] = React.useState(props.defaultValue);
	const filteredItems = useAutocomplete(props.items, "title", value, 5);

	return (
		<div className="autocomplete">
			<input ref={props.inputRef} value={value} onChange={e => setValue(e.target.value)} />
			<List onItemSelect={console.log} items={filteredItems} />
		</div>
	);
};
