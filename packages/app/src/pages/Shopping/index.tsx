import React from 'react';
import { Provider, useDispatch } from 'react-redux';

import { RefreshContext } from './RefreshContext';

import { store } from '../../store';
import { tasks } from '../../store/tasks';
import { tasksCompleted } from '../../store/tasks-completed';

import './styles.scss';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { TasksList } from '../../components/TasksList';
import { useToDoClient } from '../../api/ToDoClientContext';


const ShoppingRaw = (props: any) => {
	const [version, setVersion] = React.useState(0);
	const client = useToDoClient();
	const dispatch = useDispatch();

	const refresh = React.useCallback(() => {
		setVersion(version + 1);
	}, [version]);

	React.useEffect(() => {
		dispatch(tasks.actions.fetchingPending());
		client?.getTasks(false).then(res => {
			dispatch(tasks.actions.fetchingSuccess(res.value));
		}).catch(err => {
			dispatch(tasks.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
		});
	}, [version]);

	React.useEffect(() => {
		dispatch(tasksCompleted.actions.fetchingPending());
		client?.getTasks(true).then(res => {
			dispatch(tasksCompleted.actions.fetchingSuccess(res.value));
		}).catch(err => {
			dispatch(tasksCompleted.actions.fetchingSuccess([{ id: 1, title: "Error. Not found." }] as any));
		});
	}, []);

	return (
		<RefreshContext.Provider value={refresh}>
			<div className="app">
				<Header />
				<div className="main">
					<TasksList />
				</div>
				<Footer />
			</div>
		</RefreshContext.Provider>
	)
};


export const Shopping = (props: any) => (
	<Provider store={store}>
		<ShoppingRaw />
	</Provider>
);
