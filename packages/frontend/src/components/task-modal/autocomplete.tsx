import * as React from 'react';
import { connect } from 'react-redux';

import { tasksCompleted } from '../../store/tasks-completed';
import { tasks } from '../../store/tasks';



function mapWithLimit<T>(
	arr: T[],
	limit: number,
	callback: (item: T, length?: number, arr?: T[]) => boolean
) {
	const arrLength = arr.length;
	const result: T[] = [];
	for (let i = 0, count = 0; i < arrLength; i++) {
		if (callback(arr[i], arrLength, arr)) {
			result.push(arr[i]);
			count++;
		}
		if (count >= limit) break;
	}
	return result;
}


export const AutocompleteItem = (props: any) => {
	const handleClick = React.useCallback(() => {
		props.onSelect(props.data);
	}, []);

	return (
		<li className="inputter-autocomplete-item" onClick={handleClick}>
			{props.data.title}
		</li>
	);
};


export const Autocomplete = ({ completedTasks, onSelect }: any) => (completedTasks.length > 0) ? (
	<ul className="inputter-autocomplete">
		{completedTasks.map((item: any) =>
			<AutocompleteItem key={item.id} data={item} onSelect={onSelect} />
		)}
	</ul>
) : null;


export default connect(
	(state: any, ownProps: any) => ({
		completedTasks: ownProps.value ? mapWithLimit(
			state.tasksCompleted.items, 5,
			(item: any) => new RegExp(ownProps.value, 'ig').test(item.title)
		) : state.tasksCompleted.items.slice(0, 5)
	}),
)(Autocomplete);
