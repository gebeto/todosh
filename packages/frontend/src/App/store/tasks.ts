import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import { WTask } from '../Wunderlist';
import { wunderlist, LIST_ID } from './utils';


interface TasksState {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: number[];
	byId: Record<number, WTask>;
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
		fetchingSuccess: (state: TasksState, { payload }: PayloadAction<WTask[]>) => ({
			...state,
			isFetching: false,
			ids: payload.map(item => item.id),
			byId: payload.reduce((curr: Record<number, WTask>, item) => {
				curr[item.id] = item;
				return curr;
			}, {})
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
		}),
		deleted: (state: TasksState, { payload }: PayloadAction<number>) => {
			delete state.byId[payload];
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


export const setIsCompleted = (task: WTask, isCompleted: boolean) => (dispatch: Dispatch) => {
	dispatch(tasks.actions.updated({...task, completed: isCompleted}));
	wunderlist.completeTask(task.id, task.revision, isCompleted).then((res: WTask) => {
		dispatch(tasks.actions.updated({...task, revision: res.revision, completed: res.completed}));
	});
}


export const addNewTask = (taskText: string) => (dispatch: Dispatch, getState: any) => {
	wunderlist.createTask(LIST_ID, taskText)
		.then(task => {
			dispatch(tasks.actions.added(task));
		});
}

export const addOldTask = (task: WTask) => (dispatch: Dispatch, getState: any) => {
	dispatch(tasks.actions.added(task));
	wunderlist.completeTask(task.id, task.revision, task.completed)
		.then((res: WTask) => {
			dispatch(tasks.actions.updated(res));
		});
}

export const loadTasks = () => async (dispatch: Dispatch) => {
	wunderlist.getTasksForState(LIST_ID, false)
		.then(response => {
			if (Array.isArray(response)) {
				dispatch(tasks.actions.fetchingSuccess(response));
			} else {
				dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
			}
		}).catch(err => {
			dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
		});
}
