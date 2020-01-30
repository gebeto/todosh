import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import { WTask } from '../Wunderlist';
import { wunderlist, LIST_ID } from './utils';


interface InitialState {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: number[];
	byId: Record<number, WTask>;
}

const initialState: InitialState = {
	isFetchingError: false,
	isFetching: true,
	ids: [],
	byId: {},
};


export const tasks = createSlice({
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
			ids: [...state.ids, action.payload.id],
			byId: {
				...state.byId,
				[action.payload.id]: action.payload
			},
		}),
		deleted: (state, action) => {
			delete state.byId[action.payload];
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


export const setIsCompleted = (task: WTask, isCompleted: boolean) => (dispatch: Dispatch) => {
	dispatch(tasks.actions.updated({...task, completed: isCompleted}));
	wunderlist.completeTask(task.id, task.revision, isCompleted).then((res: WTask) => {
		// console.log("UPDATED", task, res);
		// dispatch(tasks.actions.updated({...res}));
		dispatch(tasks.actions.updated({...task, revision: res.revision, completed: res.completed}));
	});
}


export const addNewTask = (taskText: string) => (dispatch: Dispatch, getState: any) => {
	wunderlist.createTask(LIST_ID, taskText)
		.then(task => {
			dispatch(tasks.actions.added(task));
		});
}

export const loadTasks = () => async (dispatch: Dispatch) => {
	wunderlist.getTasksForState(LIST_ID, false)
		.then(response => {
			if (Array.isArray(response)) {
				dispatch(tasks.actions.fetchingSuccess(response));
			} else {
				dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
			}
		}).catch(err => {
			dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }]));
		});
}
