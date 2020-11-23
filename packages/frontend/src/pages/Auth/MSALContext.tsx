import * as React from "react";
// import { AuthResponse, UserAgentApplication } from "msal";
import * as MSAL from '@azure/msal-browser';
import { Client } from "@microsoft/microsoft-graph-client";
import { config } from "./config";

console.log('MSALLL', MSAL);

// const pap = new MSAL.PublicClientApplication({
// 	auth: {
// 		clientId: config.appId,
// 		redirectUri: window.location.origin + window.location.pathname,
// 	},
// 	cache: {
// 		cacheLocation: "localStorage",
// 		storeAuthStateInCookie: false,
// 	},
// });
// console.log(pap);


export type MSALValue = {
	isAuthenticated: boolean;
	login: any;
	logout: any;
}

export const defaultContextValue: MSALValue = {
	isAuthenticated: false,
	login: () => null,
	logout: () => null,
};

export const MSALContext = React.createContext<MSALValue>(defaultContextValue);
export const useMSAL = () => React.useContext(MSALContext);

export const GraphClientContext = React.createContext<any>(undefined);
export const useGraphClientContext = () => React.useContext(GraphClientContext);

export const MSALProvider: React.FC<any> = ({ children, msal }) => {
	const [client, setClient] = React.useState<Client>();

	const authCallback = (authResponse: any) => {
		if (!authResponse.accessToken) return;
		const client = Client.init({
			authProvider: (done) => {
				console.log(authResponse.accessToken);
				done(null, authResponse.accessToken);
			}
		});
		setClient(client);
	}

	const userAgentApplication = React.useMemo(() => {
		const userAgentApplication = new MSAL.PublicClientApplication({
			auth: {
				clientId: config.appId,
				redirectUri: window.location.origin + window.location.pathname,
			},
			cache: {
				cacheLocation: "localStorage",
				storeAuthStateInCookie: false,
			},
		});

		return userAgentApplication;
	}, []);

	const acquare = React.useCallback(async () => {
		const authResponse = await userAgentApplication.acquireTokenSilent({
			account: {} as any,
			scopes: config.scopes,
		});
		authCallback(authResponse);
	}, [userAgentApplication]);

	const login = React.useCallback(async () => {
		await userAgentApplication.loginPopup({
			scopes: config.scopes,
			prompt: "select_account",
		});
		await acquare();
	}, [userAgentApplication]);

	const logout = React.useCallback(async () => {
		userAgentApplication.logout();
	}, [userAgentApplication]);

	React.useEffect(() => {
		acquare();
	}, []);

	const msalValue: MSALValue = React.useMemo(() => ({
		isAuthenticated: !!client,
		login,
		logout,
	}), [client]);

	return (
			<MSALContext.Provider value={msalValue}>
				<GraphClientContext.Provider value={client}>
					{children}
				</GraphClientContext.Provider>
			</MSALContext.Provider>
	);
}
