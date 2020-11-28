import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import { Task } from '../api';


interface TasksState {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: string[];
	byId: Record<string, Task>;
}

const initialState: TasksState = {
	isFetchingError: false,
	isFetching: true,
	ids: [],
	byId: {},
};


export const tasks = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		fetchingPending: (state: TasksState, { payload }: PayloadAction) => ({
			...state,
			isFetching: true,
		}),
		fetchingSuccess: (state: TasksState, { payload }: PayloadAction<Task[]>) => ({
			...state,
			isFetching: false,
			ids: payload.map(item => item.id),
			byId: payload.reduce((curr: Record<string, Task>, item) => {
				curr[item.id] = item;
				return curr;
			}, {})
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
		}),
		deleted: (state: TasksState, { payload }: PayloadAction<string>) => {
			delete state.byId[payload];
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


export const toggleIsCompleted = (task: Task) => (dispatch: Dispatch) => {
	dispatch(tasks.actions.updated({
		...task,
		completedDateTime: task.completedDateTime ? null : (new Date()).toISOString(),
	}));
	const updateTaskCompletion = task.completedDateTime ? uncompleteTask : completeTask;
	updateTaskCompletion(task.id).then(res => {
		dispatch(tasks.actions.updated(res));
	})
}


export const addNewTask = (taskText: string) => (dispatch: Dispatch, getState: any) => {
	createTask(taskText).then(res => {
		dispatch(tasks.actions.added(res));
	});
}

export const addOldTask = (task: Task) => (dispatch: Dispatch, getState: any) => {
	dispatch(tasks.actions.added(task));
	uncompleteTask(task.id).then(res => {
		dispatch(tasks.actions.updated(res));
	});
}
