import * as React from 'react';
import { connect } from 'react-redux';



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


export const Autocomplete = ({ value, tasksCompleted }: any) => (value && tasksCompleted.length > 0) ? (
	<ul className="inputter-autocomplete">
		{tasksCompleted.map((item: any) =>
			<li key={item.id} className="inputter-autocomplete-item">{item.title}</li>
		)}
	</ul>

) : null;

const emptyArray: any[] = [];
export default connect(
	(state: any, ownProps: any) => ({
		tasksCompleted: ownProps.value ? mapWithLimit(
			state.tasksCompleted.items, 5,
			(item: any) => new RegExp(ownProps.value, 'ig').test(item.title)
		) : emptyArray
	}),
)(Autocomplete);
