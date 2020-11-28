import * as React from "react";

import { MsalProvider } from '@azure/msal-react';

import { ToDoClientProvider } from '../../api/ToDoClientContext';
import { Authorization } from './Authorization';

import './styles.scss';

import { PublicClientApplication } from '@azure/msal-browser';
import { config } from "./config";


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
