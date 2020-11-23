import React from 'react';
import { useMsalAuthentication, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { GraphClientContext } from './MSALContext';
import { config } from './config';
import { Client } from '@microsoft/microsoft-graph-client';


export const Authorization: React.FC<any> = (props) => {
	const [client, setClient] = React.useState<any>(undefined);
	const isAuthenticated = useIsAuthenticated();
	const msal = useMsalAuthentication(InteractionType.Popup);

	const { instance, accounts, inProgress } = useMsal();

	React.useEffect(() => {
		(async () => {
			if (accounts.length) {
				console.log(accounts);
				const authResponse = await instance.acquireTokenSilent({
					account: accounts[0],
					scopes: config.scopes,
				});
				if (!authResponse.accessToken) return;
				const client = Client.init({
					authProvider: (done) => {
						console.log(authResponse.accessToken);
						done(null, authResponse.accessToken);
					}
				});
				setClient(client);
			}
		})()
	}, []);

	if (!isAuthenticated) {
		return (
			<form className="login-button-wrapper">
				<button type="button" onClick={(e) => msal.login()} className="login-button">Login san</button>
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
