import * as React from 'react';

import { Autocomplete } from '../Autocomplete';

import './styles.scss';


export type AutocompleteTaskProps = {
	className?: string;
	defaultValue?: string;
	items: Array<{id: number, title: string}>;
	inputRef: React.Ref<HTMLInputElement>;
}


export const AutocompleteTask = (props) => {
	const [value, setValue] = React.useState(props.defaultValue);

	const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	return (
		<div className="autocomplete">
			<input ref={props.inputRef} value={value} onChange={handleInputChange} autoFocus />
			<Autocomplete onItemSelect={console.log} value={value} items={props.items} />
		</div>
	);
};
