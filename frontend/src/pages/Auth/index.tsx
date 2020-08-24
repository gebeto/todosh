import * as React from 'react';
import './styles.scss';

import { UserAgentApplication, AuthResponse } from 'msal';

import { getUserDetails } from '../../api/';


const scopes = ['User.Read', 'Tasks.ReadWrite'];

export class Auth extends React.Component<any, any> {
	state = {
		user: undefined,
		isAuthorized: !!localStorage.getItem('access_token'),
	};

	userAgent = new UserAgentApplication({
		auth: {
			clientId: '7fc7de55-63f9-4fea-91a2-b7a54eed78a9',
			// redirectUri: 'http://localhost:5000',
			redirectUri: window.location.origin + window.location.pathname,
		},
		cache: {
			cacheLocation: 'localStorage',
			storeAuthStateInCookie: true,
		}
	});

	constructor(props: any) {
		super(props);

		const user = this.userAgent.getAccount();
		console.log(user);
	}

	login = async () => {
		await this.userAgent.loginPopup({
			scopes: scopes,
			prompt: 'select_account',
		});
		await this.getUserProfile();
	}

	logout = async () => {
		await this.userAgent.logout();
	}

	getUserProfile = async () => {
		const accessToken = await this.userAgent.acquireTokenSilent({
			scopes: scopes,
		});

		if (accessToken) {
			console.log(accessToken);
			localStorage.setItem('access_token', accessToken.accessToken)
			this.setState((state: any) => ({ ...state, isAuthorized: true }));
			const user = await getUserDetails();
		}
	}

	render() {
		if (this.state.isAuthorized) {
			return this.props.children;
		}
		return (
			<form className="login-button-wrapper">
				<button type="button" onClick={this.login} className="login-button">Login with Microsoft</button>
			</form>
		);

	}
}

export default Auth;