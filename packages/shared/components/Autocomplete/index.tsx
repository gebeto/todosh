import * as React from 'react';

import { List } from '../List';
import { useAutocomplete } from '../../hooks/useAutocomplete';

import './styles.scss';


export type AutocompleteProps = {
	defaultValue?: string;
	items: Array<{id: number, title: string}>;
	inputRef: React.Ref<HTMLInputElement>;
}


export const Autocomplete = (props) => {
	const [value, setValue] = React.useState(props.defaultValue);

	const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const filteredItems = useAutocomplete(props.items, value, 5);

	return (
		<div className="autocomplete">
			<input ref={props.inputRef} value={value} onChange={handleInputChange} />
			<List onItemSelect={console.log} items={filteredItems} />
		</div>
	);
};
