import * as React from "react";

import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import { ToDoClientProvider } from '../../api/ToDoClientContext';
import { Authorization } from './Authorization';

import { config } from "./config";

import './styles.scss';


const pca = new PublicClientApplication({
	auth: {
		clientId: config.appId,
		redirectUri: window.location.origin + window.location.pathname,
		// postLogoutRedirectUri: window.location.origin + window.location.pathname,
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: false,
	},
});


export const AuthProvider: React.FC<any> = (props) => {
	return (
		<MsalProvider instance={pca}>
			<Authorization>
				<ToDoClientProvider>
					{props.children}
				</ToDoClientProvider>
			</Authorization>
		</MsalProvider>
	);
}
