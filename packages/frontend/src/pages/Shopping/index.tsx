import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import store from '../../store/';
import { loadTasks } from '../../store/tasks';
import { loadTasksCompleted } from '../../store/tasks-completed';

import './styles.scss';

import Header from '../../components/header/';
import Footer from '../../components/footer/';
import { List } from '../../components/list/';


const ShoppingRaw = (props: any) => {
	React.useEffect(() => {
		props.initializeTasks();
	}, [])

	return (
		<Provider store={store}>
			<div className="app">
				<Header />
				<div className="main">
					<List />
				</div>
				<Footer />
			</div>
		</Provider>
	)
};

export const ShoppingConnected = connect(undefined,
	(dispatch: any) => ({
		async initializeTasks() {
			await loadTasks()(dispatch);
			await loadTasksCompleted()(dispatch);
		}
	})
)(ShoppingRaw);


export const Shopping = (props: any) => (
	<Provider store={store}>
		<ShoppingConnected />
	</Provider>
);