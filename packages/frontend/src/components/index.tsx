import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.scss';

import List from './List/';
import CreateTask from './CreateTask/';

import settingsIcon from './settings-icon.svg';


const App = () => (
	<div className="app">
		<div className="header">
			<h1>List</h1>
			<img src={settingsIcon} height="28" />
		</div>
		<div className="main">
			<List />
		</div>
		<div>
			<CreateTask />
		</div>
	</div>
);


export default App;