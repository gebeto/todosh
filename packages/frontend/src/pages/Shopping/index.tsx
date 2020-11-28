import React from 'react';
import { Provider, useDispatch } from 'react-redux';

import { store } from '../../store/';
import { tasks } from '../../store/tasks';
import { tasksCompleted } from '../../store/tasks-completed';

import './styles.scss';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { TasksList } from '../../components/TasksList';
import { useToDoClient } from '../Auth/ToDoClientContext';
import { todoTaskListId } from '../../api/ToDoClient';


const ShoppingRaw = (props: any) => {
	const client = useToDoClient();
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(tasks.actions.fetchingPending());
		client?.getTasks(todoTaskListId, false).then(res => {
			dispatch(tasks.actions.fetchingSuccess(res.value));
		}).catch(err => {
			dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
		});

		dispatch(tasksCompleted.actions.fetchingPending());
		client?.getTasks(todoTaskListId, true).then(res => {
			dispatch(tasksCompleted.actions.fetchingSuccess(res.value));
		}).catch(err => {
			dispatch(tasksCompleted.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
		});
	}, []);

	return (
		<Provider store={store}>
			<div className="app">
				<Header />
				<div className="main">
					<TasksList />
				</div>
				<Footer />
			</div>
		</Provider>
	)
};


export const Shopping = (props: any) => (
	<Provider store={store}>
		<ShoppingRaw />
	</Provider>
);
