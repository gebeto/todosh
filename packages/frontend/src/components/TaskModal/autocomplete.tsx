import * as React from 'react';
import { connect, useSelector } from 'react-redux';

import { tasksCompleted } from '../../store/tasks-completed';
import { tasks } from '../../store/tasks';



function mapWithLimit<T>(
	arr: T[],
	limit: number,
	callback: (item: T, length?: number, arr?: T[]) => boolean
) {
	const arrLength = arr.length;
	const result: T[] = [];
	for (let i = 0; i < arrLength; i++) {
		if (callback(arr[i], arrLength, arr)) {
			result.push(arr[i]);
		}
		
		if (result.length >= limit){
			break;
		}
	}
	return result;
}


export const AutocompleteItem = (props: any) => (
	<li
		className="inputter-autocomplete-item"
		onClick={() => props.onSelect(props.data)}
	>
		{props.data.title}
	</li>
);


export const Autocomplete = ({ value, onSelect }: any) => {
	const completedTasks = useSelector((state: any) => {
		if (value) {
			return mapWithLimit(
				state.tasksCompleted.items,
				5,
				(item: any) => new RegExp(value, 'ig').test(item.title)
			);
		}

		return state.tasksCompleted.items.slice(0, 5);

	})

	if (!completedTasks.length) {
		return null;
	}

	return (
		<ul className="inputter-autocomplete">
			{completedTasks.map((item: any) =>
				<AutocompleteItem key={item.id} data={item} onSelect={onSelect} />
			)}
		</ul>
	);
};
