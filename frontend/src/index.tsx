// import '@babel/polyfill';
import "regenerator-runtime/runtime";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CONFIG from './config';
import App from './App/';
import './styles.scss';


const AuthApp = () => (
	<form className="login-button-wrapper" method="POST" action="https://wundershoppinglist.herokuapp.com/auth">
		<input type="hidden" name="redirect" value={window.location.href} />
		<button type="submit" className="login-button">Login with Wunderlist</button>
	</form>
);


let AppComponent = CONFIG.access_token ? App : AuthApp;


ReactDOM.render(<AppComponent/>, document.getElementById("root"));