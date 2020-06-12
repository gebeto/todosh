import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';

// import { ITask } from '../Wunderlist';
// import { wunderlist, LIST_ID } from './utils';

import { getTasks, ITask } from '../api/';


interface TasksState {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: string[];
	byId: Record<string, ITask>;
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
		fetchingSuccess: (state: TasksState, { payload }: PayloadAction<ITask[]>) => ({
			...state,
			isFetching: false,
			ids: payload.map(item => item.id),
			byId: payload.reduce((curr: Record<string, ITask>, item) => {
				curr[item.id] = item;
				return curr;
			}, {})
		}),
		fetchingError: (state: TasksState, { payload }: PayloadAction) => ({
			...state,
			isFetching: false,
			isFetchingError: true,
		}),
		added: (state: TasksState, { payload }: PayloadAction<ITask>) => ({
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
		updated: (state: TasksState, { payload }: PayloadAction<ITask>) => ({
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


export const setIsCompleted = (task: ITask, isCompleted: boolean) => (dispatch: Dispatch) => {
	dispatch(tasks.actions.updated({...task, completed: isCompleted}));
	// wunderlist.completeTask(task.id, task.revision, isCompleted).then((res: ITask) => {
	// 	dispatch(tasks.actions.updated({...task, revision: res.revision, completed: res.completed}));
	// });
}


export const addNewTask = (taskText: string) => (dispatch: Dispatch, getState: any) => {
	// wunderlist.createTask(LIST_ID, taskText)
	// 	.then(task => {
	// 		dispatch(tasks.actions.added(task));
	// 	});
}

export const addOldTask = (task: ITask) => (dispatch: Dispatch, getState: any) => {
	// dispatch(tasks.actions.added(task));
	// wunderlist.completeTask(task.id, task.revision, task.completed)
	// 	.then((res: ITask) => {
	// 		dispatch(tasks.actions.updated(res));
	// 	});
}

export const loadTasks = () => async (dispatch: Dispatch) => {
	// wunderlist.getTasksForState(LIST_ID, false)
	// 	.then(response => {
	// 		if (Array.isArray(response)) {
	// 			dispatch(tasks.actions.fetchingSuccess(response));
	// 		} else {
	// 			dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
	// 		}
	// 	}).catch(err => {
	// 		dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
	// 	});
	getTasks(undefined, false)
		.then(response => {
			if (Array.isArray(response.value)) {
				dispatch(tasks.actions.fetchingSuccess(response));
			} else {
				dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
			}
		})
		.catch(err => {
			dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
		});
}
