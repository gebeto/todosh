import { configureStore } from '@reduxjs/toolkit';

import { tasks } from './tasks';
import { tasksCompleted } from './tasks-completed';
import { userReducer } from './user';


export const store = configureStore({
	devTools: true,
	reducer: {
		tasks: tasks.reducer,
		tasksCompleted: tasksCompleted.reducer,
		user: userReducer,
	}
});
