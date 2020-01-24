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
}

const initialState: InitialState = {
	tasks: [],
	isFetching: true,
	isFetchingError: false,
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
			dispatch(tasks.actions.fetchingSuccess(response));
		});
}


export default createStore(tasks.reducer, applyMiddleware(thunk));
