import React from 'react';
import { useMsalAuthentication, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { AccountInfo, InteractionRequiredAuthError, InteractionType, SilentRequest } from '@azure/msal-browser';
import { GraphClientContext } from './MSALContext';
import { config } from './config';
import { Client } from '@microsoft/microsoft-graph-client';


export const Authorization: React.FC<any> = (props) => {
	const [client, setClient] = React.useState<any>(undefined);
	const isAuthenticated = useIsAuthenticated();
	const { instance, accounts } = useMsal();

	const createClient = (authResponse: any) => {
		if (!authResponse.accessToken) return;
		const client = Client.init({
			authProvider: (done) => {
				done(null, authResponse.accessToken);
			}
		});
		setClient(client);
	}

	const acquare = async (account: AccountInfo) => {
		const options = {
			account: account,
			scopes: config.scopes,
			forceRefresh: true,
		};
		const authResponse = await instance.acquireTokenSilent(options).catch(error => {
			console.log('SSSSICK', error);
			if (error instanceof InteractionRequiredAuthError) {
				return instance.acquireTokenRedirect(options);
			}
		});;
		createClient(authResponse);
	}

	React.useEffect(() => {
		if (accounts.length) {
			acquare(accounts[0]);
		}
	}, [ instance ]);

	const handleLogin = async (e: any) => {
		const loginResponse = await instance.loginPopup();
		console.log(loginResponse);
		acquare(loginResponse.account);
	}

	if (!isAuthenticated) {
		return (
			<form className="login-button-wrapper">
				<button type="button" onClick={handleLogin} className="login-button">Login</button>
			</form>
		);
	}

	if (!client) {
		return <div>Loading...</div>
	}

	return (
		<GraphClientContext.Provider value={client}>
			{props.children}
		</GraphClientContext.Provider>
	);
}
