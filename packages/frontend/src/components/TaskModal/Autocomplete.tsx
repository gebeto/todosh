import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectorTasksFilteredByValue } from '../../store/tasks-completed';


export const AutocompleteItem = (props: any) => (
	<li
		className="inputter-autocomplete-item"
		onClick={() => props.onSelect(props.data)}
	>
		{props.data.title}
	</li>
);


export const Autocomplete = ({ value, onSelect }: any) => {
	const autocompleteTasks = useSelector(state => selectorTasksFilteredByValue(state, value));

	return (
		<ul className="inputter-autocomplete">
			{autocompleteTasks.map((item: any) =>
				<AutocompleteItem key={item.id} data={item} onSelect={onSelect} />
			)}
		</ul>
	);
};
