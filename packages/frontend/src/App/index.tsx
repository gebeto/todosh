import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import store, { loadTasks } from './store';

import './styles.scss';

import { Header } from './Header/';
import List from './List/';
import CreateTask from './CreateTask/';


const App = (props: any) => {
	React.useEffect(() => {
		props.loadTasks();
	}, [])

	return (
		<Provider store={store}>
			<div className="app">
				<Header />
				<div className="main">
					<List />
				</div>
				<div>
					<CreateTask />
				</div>
			</div>
		</Provider>
	)
};

const AppConnected = connect(undefined, { loadTasks })(App);


export default (props: any) => (
	<Provider store={store}>
		<AppConnected />
	</Provider>
);