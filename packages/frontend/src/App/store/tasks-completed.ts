import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import { WTask } from '../Wunderlist';
import { wunderlist, LIST_ID } from './utils';


interface TasksState {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: number[];
	byId: Record<number, WTask>;
	items: WTask[];
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
		fetchingSuccess: (state, { payload }: PayloadAction<WTask[]>) => ({
			...state,
			isFetching: false,
			ids: payload.map(item => item.id),
			byId: payload.reduce((curr: Record<number, WTask>, item) => {
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
		added: (state: TasksState, { payload }: PayloadAction<WTask>) => ({
			...state,
			ids: [...state.ids, payload.id],
			byId: {
				...state.byId,
				[payload.id]: payload
			},
			items: [...state.items, payload]
		}),
		deleted: (state: TasksState, { payload }: PayloadAction<number>) => {
			delete state.byId[payload];
			state.items = state.items.filter(item => item.id !== payload);
			return state;
		},
		updated: (state: TasksState, { payload }: PayloadAction<WTask>) => ({
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


export const loadTasksCompleted = () => async (dispatch: Dispatch) => {
	wunderlist.getTasksForState(LIST_ID, true)
		.then(response => {
			if (Array.isArray(response)) {
				dispatch(tasksCompleted.actions.fetchingSuccess(response));
			} else {
				dispatch(tasksCompleted.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
			}
		}).catch(err => {
			dispatch(tasksCompleted.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
		});
}
