import * as React from "react";

import { ToDoClientProvider } from './ToDoClientContext';
import { MSALProvider, useMSAL } from './MSALContext';

import './styles.scss';


export const LoginComponent: React.FC<any> = (props) => {
	const msal = useMSAL();

	if (!msal.isAuthenticated) {
		return (
			<form className="login-button-wrapper">
				<button type="button" onClick={msal.login} className="login-button">Login</button>
			</form>
		);
	}

	return props.children;
}


export const AuthProvider: React.FC<any> = (props) => {
	return (
		<MSALProvider>
			<ToDoClientProvider>
				<LoginComponent>
					{props.children}
				</LoginComponent>
			</ToDoClientProvider>
		</MSALProvider>
	);
}
