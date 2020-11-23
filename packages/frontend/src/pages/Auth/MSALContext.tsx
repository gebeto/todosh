import * as React from "react";
import { AuthResponse, UserAgentApplication } from "msal";
import { Client } from "@microsoft/microsoft-graph-client";
import { config } from "./config";


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

const isRedirect = !!window.location.hash;

export const MSALProvider: React.FC<any> = ({ children, msal }) => {
	const [client, setClient] = React.useState<Client>();

	const userAgentApplication = React.useMemo(() => {
		const userAgentApplication = new UserAgentApplication({
			auth: {
				clientId: config.appId,
				redirectUri: window.location.origin + window.location.pathname,
			},
			cache: {
				cacheLocation: "localStorage",
				storeAuthStateInCookie: false,
			},
		});

		const authCallback = (err: any, authResponse: any) => {
			const client = Client.init({
				authProvider: (done) => {
					console.log(authResponse.accessToken);
					done(null, authResponse.accessToken);
				}
			});
			setClient(client);
		}

		userAgentApplication.handleRedirectCallback(authCallback);

		return userAgentApplication;
	}, []);

	const account = React.useMemo(() => {
		return userAgentApplication.getAccount();
	}, []);

	const acquare = React.useCallback(async () => {
		const acquareData = {
			scopes: config.scopes,
		};
		userAgentApplication.acquireTokenRedirect(acquareData)
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
		if (!isRedirect) {
			acquare();
		}
	}, [account]);

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
