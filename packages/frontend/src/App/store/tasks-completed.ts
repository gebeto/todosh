import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import { WTask } from '../Wunderlist';
import { wunderlist, LIST_ID } from './utils';


interface InitialState {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: number[];
	byId: Record<number, WTask>;
	items: WTask[];
}

const initialState: InitialState = {
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
		fetchingPending: (state, action) => ({
			...state,
			isFetching: true,
		}),
		fetchingSuccess: (state, { payload }) => ({
			...state,
			isFetching: false,
			ids: payload.map((item: any) => item.id),
			byId: payload.reduce((curr: any, item: any) => {
				curr[item.id] = item;
				return curr;
			}, {}),
			items: payload,
		}),
		fetchingError: (state, action) => ({
			...state,
			isFetching: false,
			isFetchingError: true,
		}),
		added: (state, action) => ({
			...state,
			ids: [...state.ids, action.payload.id],
			byId: {
				...state.byId,
				[action.payload.id]: action.payload
			},
			items: [...state.items, action.payload]
		}),
		deleted: (state, action) => {
			delete state.byId[action.payload];
			state.items = state.items.filter(item => item.id !== action.payload);
			return state;
		},
		updated: (state, action) => {
			return {
				...state,
				byId: {
					...state.byId,
					[action.payload.id]: {
						...state.byId[action.payload.id],
						...action.payload,
					}
				}
			}
		},
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
