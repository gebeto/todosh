import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import store from './store/';
import { loadTasks } from './store/tasks';
import { loadTasksCompleted } from './store/tasks-completed';

import './styles.scss';

import Header from './Header/';
import Main from './Main/';
import Footer from './Footer/';


const App = (props: any) => {
	React.useEffect(() => {
		props.initializeTasks();
	}, [])

	return (
		<Provider store={store}>
			<div className="app">
				<Header />
				<div className="main">
					<Main />
				</div>
				<Footer />
			</div>
		</Provider>
	)
};

const AppConnected = connect(undefined,
	(dispatch: any) => ({
		async initializeTasks() {
			await loadTasks()(dispatch);
			await loadTasksCompleted()(dispatch);
		}
	})
)(App);


export default (props: any) => (
	<Provider store={store}>
		<AppConnected />
	</Provider>
);