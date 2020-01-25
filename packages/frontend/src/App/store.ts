import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import CONFIG from '../config';
import { WTask, Wunderlist } from './Wunderlist';

const wunderlist = new Wunderlist(CONFIG);
const LIST_ID = 365103446;

interface InitialState {
	tasks: WTask[];
	isFetching: boolean;
	isFetchingError: boolean;
	ids: number[];
	byId: Record<number, any>;
}

const initialState: InitialState = {
	isFetchingError: false,
	isFetching: true,
	tasks: [],
	ids: [],
	byId: {},
};


const tasks = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		fetchingPending: (state, action) => ({
			...state,
			isFetching: true,
		}),
		fetchingSuccess: (state, { payload }) => ({
			...state,
			isFetching: false,
			tasks: payload,
			ids: payload.map((item: any) => item.id),
			byId: payload.reduce((curr: any, item: any) => {
				curr[item.id] = item;
				return curr;
			}, {})
		}),
		fetchingError: (state, action) => ({
			...state,
			isFetching: false,
			isFetchingError: true,
		}),
		added: (state, action) => ({
			...state,
			tasks: [...state.tasks, action.payload],
		}),
		completed: (state, action) => {
			state.byId[action.payload] = {
				...state.byId[action.payload],
				completed: true,
			}
			return {
				...state,
				byId: { ...state.byId }
			}
		},
	},
});


export const addNewTask = (taskText: string) => (dispatch: Dispatch) => {
	wunderlist.createTask(LIST_ID, taskText)
		.then(task => {
			console.log(task);
			dispatch(tasks.actions.added(task));
		});
}

export const loadTasks = () => (dispatch: Dispatch) => {
	wunderlist.getTasksForState(LIST_ID, false)
		.then(response => {
			// if (typeof response === "")
			if (Array.isArray(response)) {
				dispatch(tasks.actions.fetchingSuccess(response));
			} else {
				dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
			}
		}).catch(err => {
			dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
		});
}


export default createStore(tasks.reducer, applyMiddleware(thunk));
