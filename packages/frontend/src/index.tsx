import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CONFIG from './config';

import App from './App/';

import './styles.scss';


interface AuthData {
	client_id: number;
	client_secret: string;
}


const AuthApp = () => {
	const [ authData, setAuthData ] = React.useState<AuthData | undefined>(undefined);

	React.useEffect(() => {
		fetch("/authData")
			.then(response => response.json())
			.then((res) => {
				localStorage.setItem('client_id', res.client_id);
				setAuthData(res);
			});
	}, []);

	return (
		<div className="login-button-wrapper">
			<a
				href={authData ? `https://www.wunderlist.com/oauth/authorize?client_id=${authData.client_id}&redirect_uri=${window.location.href}auth&state=${authData.client_secret}` : '#'}
				className="login-button"
			>
				{authData ? 'Login with Wunderlist' : 'Loading auth data...'}
			</a>
		</div>
	);
}


let AppComponent = CONFIG.access_token ? App : AuthApp;


ReactDOM.render(<AppComponent/>, document.getElementById("root"));