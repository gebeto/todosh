import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Wunderlist from './Wunderlist';
import store from './store';

import CONFIG from './config';

import App from './components/';

import './styles.scss';


const AuthApp = () => (
	<div className="login-button-wrapper">
		<a
			href={`https://www.wunderlist.com/oauth/authorize?client_id=${CONFIG.client_id}&redirect_uri=${window.location.href}auth&state=TOKENSNSNSNSSNSNSNSNSNNS`}
			className="login-button"
		>
			Login with Wunderlist
		</a>
	</div>
);


if (CONFIG.access_token) {
	const wunderlist = new Wunderlist(CONFIG);
	wunderlist.getTasksForState(365103446, false).then(res => {
		console.log(res);
		store.dispatch({ type: "SET_TASKS", payload: res });
	});
	
	ReactDOM.render(
		(
			<Provider store={store}>
				<App/>
			</Provider>
		),
		document.getElementById("root")
	);
} else {
	ReactDOM.render(<AuthApp/>, document.getElementById("root"));
}