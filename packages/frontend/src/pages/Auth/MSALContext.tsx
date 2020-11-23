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


export const MSALProvider: React.FC<any> = ({ children, msal }) => {
	const [client, setClient] = React.useState<Client>();

	const authCallback = (err: any, authResponse: any) => {
		const client = Client.init({
			authProvider: (done) => {
				console.log(authResponse.accessToken);
				done(null, authResponse.accessToken);
			}
		});
		setClient(client);
	}

	const userAgentApplication = React.useMemo(() => {
		const userAgentApplication = new UserAgentApplication({
			auth: {
				clientId: config.appId,
				redirectUri: window.location.origin + window.location.pathname,
			},
			cache: {
				cacheLocation: "localStorage",
				// storeAuthStateInCookie: false,
				storeAuthStateInCookie: true,
			},
		});
		return userAgentApplication;
	}, []);

	const account = React.useMemo(() => {
		return userAgentApplication.getAccount();
	}, []);

	const acquare = React.useCallback(async () => {
		const acquareData = {
			scopes: config.scopes,
		};
		const authResponse = await userAgentApplication
			.acquireTokenSilent(acquareData)
			.catch(err => {
				console.error(err);
				if (err.errorCode === 'interaction_required') {
					return userAgentApplication
						.acquireTokenPopup(acquareData)
				}
				console.error(err);
			});
		if (authResponse) {
			authCallback(null, authResponse);
		}
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
