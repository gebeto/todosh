import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.scss';

import List from './List/';

import settingsIcon from './settings-icon.svg';


const App = () => (
	<div>
		<div className="header">
			<h1>Tasks</h1>
			<img src={settingsIcon} height="28" />
		</div>
		<List />
	</div>
);


export default App;