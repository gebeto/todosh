import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import { tasks } from './tasks';
import { tasksCompleted } from './tasks-completed';


export default createStore(
	combineReducers({
		tasks: tasks.reducer,
		tasksCompleted: tasksCompleted.reducer,
	}),
	applyMiddleware(thunk)
);
