import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { Task } from '../api';


export type TasksCompletedState = {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: string[];
	byId: Record<string, Task>;
	items: Task[];
}


const initialState: TasksCompletedState = {
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
		fetchingPending: (state: TasksCompletedState) => ({
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
		fetchingError: (state: TasksCompletedState) => ({
			...state,
			isFetching: false,
			isFetchingError: true,
		}),
		added: (state: TasksCompletedState, { payload }: PayloadAction<Task>) => ({
			...state,
			ids: [...state.ids, payload.id],
			byId: {
				...state.byId,
				[payload.id]: payload
			},
			items: [...state.items, payload]
		}),
		deleted: (state: TasksCompletedState, { payload }: PayloadAction<string>) => {
			delete state.byId[payload];
			state.items = state.items.filter(item => item.id !== payload);
			return state;
		},
		updated: (state: TasksCompletedState, { payload }: PayloadAction<Task>) => ({
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
export const selectorTasksCompletedRoot = (state: any) => state[tasksCompleted.name] as TasksCompletedState;
export const selectorTasksIds = createSelector([selectorTasksCompletedRoot], (state) => state.ids);
export const selectorTasksById = createSelector([selectorTasksCompletedRoot], (state) => state.byId);
export const selectorTasksItems = createSelector([selectorTasksCompletedRoot], (state) => state.items);
