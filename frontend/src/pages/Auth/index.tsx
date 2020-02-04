import * as React from 'react';
import './styles.scss';


const authUrl = AUTH_ENDPOINT;

export const Auth = () => (
	<form className="login-button-wrapper" method="POST" action={authUrl}>
		<input type="hidden" name="redirect" value={window.location.href} />
		<button type="submit" className="login-button">Login with Wunderlist</button>
	</form>
);
