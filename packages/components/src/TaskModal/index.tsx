import * as React from 'react';

import { Autocomplete } from '../Autocomplete';

import './styles.scss';


export type TaskModalProps = {
	className?: string;
	defaultValue?: string;
	items: Array<{id: number, title: string}>;
	inputRef: React.Ref<HTMLInputElement>;
}


export const TaskModal = (props) => {
	const [value, setValue] = React.useState(props.defaultValue);

	const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	return (
		<form
			// onSubmit={handleFormSubmit}
			className={`inputter ${props.className}`}
		>
			<div className="inputter-input-wrapper">
				<input ref={props.inputRef} value={value} onChange={handleInputChange} autoFocus />
				<Autocomplete onSelect={console.log} value={value} items={props.items} />
			</div>
		</form>
	);
};
