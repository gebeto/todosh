import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CONFIG from './config';

import App from './App/';

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


let AppComponent = CONFIG.access_token ? App : AuthApp;


ReactDOM.render(<AppComponent/>, document.getElementById("root"));