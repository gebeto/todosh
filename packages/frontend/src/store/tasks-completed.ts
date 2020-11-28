import { createSlice, PayloadAction, Dispatch, createSelector } from '@reduxjs/toolkit';

import { Task } from '../api';
import { filterWithLimit } from '../helpers/filterWithLimit';


interface TasksState {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: string[];
	byId: Record<string, Task>;
	items: Task[];
}

const initialState: TasksState = {
	isFetchingError: false,
	isFetching: true,
	ids: [],
	byId: {},
	items: [],
};


export const tasksCompleted = createSlice({
	name: 'tasksCompleted',
	initialState: initialState,
	reducers: {
		fetchingPending: (state: TasksState, { payload }: PayloadAction) => ({
			...state,
			isFetching: true,
		}),
		fetchingSuccess: (state, { payload }: PayloadAction<Task[]>) => ({
			...state,
			isFetching: false,
			ids: payload.map(item => item.id),
			byId: payload.reduce((curr: Record<string, Task>, item) => {
				curr[item.id] = item;
				return curr;
			}, {}),
			items: payload,
		}),
		fetchingError: (state: TasksState, { payload }: PayloadAction) => ({
			...state,
			isFetching: false,
			isFetchingError: true,
		}),
		added: (state: TasksState, { payload }: PayloadAction<Task>) => ({
			...state,
			ids: [...state.ids, payload.id],
			byId: {
				...state.byId,
				[payload.id]: payload
			},
			items: [...state.items, payload]
		}),
		deleted: (state: TasksState, { payload }: PayloadAction<string>) => {
			delete state.byId[payload];
			state.items = state.items.filter(item => item.id !== payload);
			return state;
		},
		updated: (state: TasksState, { payload }: PayloadAction<Task>) => ({
			...state,
			byId: {
				...state.byId,
				[payload.id]: {
					...state.byId[payload.id],
					...payload,
				}
			}
		}),
	},
});


export const selectorValueFromProps = (state: any, value: string) => value;
export const selectorTasksCompletedRoot = (state: any) => state[tasksCompleted.name] as TasksState;
export const selectorTasksIds = createSelector([selectorTasksCompletedRoot], (state) => state.ids);
export const selectorTasksById = createSelector([selectorTasksCompletedRoot], (state) => state.byId);
export const selectorTasksItems = createSelector([selectorTasksCompletedRoot], (state) => state.items);
export const selectorTasksFilteredByValue = createSelector(
	[selectorTasksItems, selectorValueFromProps],
	(items, value) => {
		if (value) {
			return filterWithLimit(items, 5,
				(item: any) => new RegExp(value, 'ig').test(item.title)
			);
		}

		return items.slice(0, 5);
	}
);

export const loadTasksCompleted = () => async (dispatch: Dispatch) => {
	// wunderlist.getTasksForState(LIST_ID, true)
	// 	.then(response => {
	// 		if (Array.isArray(response)) {
	// 			dispatch(tasksCompleted.actions.fetchingSuccess(response));
	// 		} else {
	// 			dispatch(tasksCompleted.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
	// 		}
	// 	}).catch(err => {
	// 		dispatch(tasksCompleted.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
	// 	});
	getTasks(undefined, true).then(res => {
		dispatch(tasksCompleted.actions.fetchingSuccess(res.value));
	})
}
