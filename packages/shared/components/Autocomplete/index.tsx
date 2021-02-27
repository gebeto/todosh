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

	onItemSelect?: any;
	onItemCreate?: any;
}


export const Autocomplete: React.FC<AutocompleteProps> = (props) => {
	const [value, setValue] = React.useState(props.defaultValue || '');
	const filteredItems = useAutocomplete(props.items, "title", value, 5);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		props.onItemCreate(value);
		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<form className="autocomplete" onSubmit={handleSubmit}>
			<input ref={props.inputRef} value={value} onChange={e => setValue(e.target.value)} />
			<List onItemSelect={props.onItemSelect} items={filteredItems} />
		</form>
	);
};
