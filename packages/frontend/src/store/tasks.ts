import { createSlice, createAction, PayloadAction, Dispatch, createSelector } from '@reduxjs/toolkit';
import { createSecretKey } from 'crypto';

import { Task, TaskId } from '../api';


export type TasksState = {
	isFetching: boolean;
	isFetchingError: boolean;
	ids: TaskId[];
	byId: Record<TaskId, Task>;
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
			byId: payload.reduce((curr: Record<TaskId, Task>, item) => {
				curr[item.id] = item;
				return curr;
			}, {})
		}),

		fetchingError: (state: TasksState, { payload }: PayloadAction) => ({
			...state,
			isFetching: false,
			isFetchingError: true,
		}),

		added: (state: TasksState, { payload }: PayloadAction<Task>) => {
			state.ids.push(payload.id);
			state.byId[payload.id] = payload;
			return state;
		},

		deleted: (state: TasksState, { payload }: PayloadAction<TaskId>) => {
			const rmIndex = state.ids.indexOf(payload);
			if (rmIndex > -1) {
				const newIds = state.ids.slice();
				newIds.splice(rmIndex, 1);
				state.ids = newIds;
			}
			delete state.byId[payload];
			return state;
		},

		updated: (state: TasksState, { payload }: PayloadAction<Task>) => {
			if (state.byId[payload.id]) {
				state.byId[payload.id] = {
					...state.byId[payload.id],
					...payload,
				}
			}

			return state;
		},
	},
});


export const selectorTaskIdFromProps = (state: any, taskId: TaskId) => taskId;
export const selctorTasksRoot = (state: any) => state[tasks.name] as TasksState;
export const selctorTasksIds = createSelector([selctorTasksRoot], state => state.ids);
export const selctorTasksById = createSelector([selctorTasksRoot], state => state.byId);

export const selctorTaskById = createSelector(
	[selctorTasksById, selectorTaskIdFromProps],
	(byId, id) => byId[id]
);
