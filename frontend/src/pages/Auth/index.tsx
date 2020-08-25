import { UserAgentApplication } from "msal";
import * as React from "react";

import './styles.scss';


const msalConfig = {
	auth: {
		authority: "https://login.microsoftonline.com/common",
		clientId: "7fc7de55-63f9-4fea-91a2-b7a54eed78a9",
		redirectUri: window.location.origin + window.location.pathname,
		navigateToLoginRequestUrl: true,
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: false
	},
};

const msalInstance = new UserAgentApplication(msalConfig as any);

msalInstance.handleRedirectCallback((error, response) => {
	if (error) {
		alert(JSON.stringify(error));
	}

	if (response && response.tokenType === "access_token") {
		localStorage.setItem("__accesstoken", response.accessToken);
		// query(response.accessToken);
	} else if (response && response.tokenType === "id_token") {
		getToken();
	}
});

function login() {
	msalInstance.loginRedirect({
		scopes: ["user.read", "tasks.readwrite"]
	});
}


function getToken() {
	if (msalInstance.getAccount()) {
		var tokenRequest = {
			scopes: ["user.read", "tasks.readwrite"]
		};
		msalInstance.acquireTokenRedirect(tokenRequest);
		return;
	} else {
		console.log("NO, ERROR");
	}
}


function getLists() {
	query("https://graph.microsoft.com/beta/me/todo/lists")
}

function getTasks(listId: string) {
	const todoTaskListId = "AQMkADAwATM3ZmYAZS0xNzQ5LTBjMzYtMDACLTAwCgAuAAADJZb0rY_RDES0Hj1NYJSo8wEALhRIhJvN6EaHTkQYs9qhUwABlWGG0QAAAA==";
	const url = `https://graph.microsoft.com/beta/me/todo/lists/${todoTaskListId}/tasks?$top=1000`;
	query(url);
}

function getUserTasks(userId: string, listId: string) {
	const todoTaskListId = "AQMkADAwATM3ZmYAZS0xNzQ5LTBjMzYtMDACLTAwCgAuAAADJZb0rY_RDES0Hj1NYJSo8wEALhRIhJvN6EaHTkQYs9qhUwABlWGG0QAAAA==";
	const url = `https://graph.microsoft.com/beta/users/${userId}/todo/lists/${todoTaskListId}/tasks`;
	query(url);
}

function getMe() {
	query(`https://graph.microsoft.com/beta/me`);
}


function query(url: string) {
	const token = localStorage.getItem('__accesstoken');
	var headers = new Headers();
	var bearer = "Bearer " + token;
	headers.append("Authorization", bearer);
	fetch(url, {method: "GET", headers: headers}).then(resp => resp.json()).then(rs => {
		console.log(rs);
		// alert(JSON.stringify(rs))
	});
}


const MSALContext = React.createContext(null);


export const AuthProvider = (props: any) => {
	const [token, setToken] = React.useState(localStorage.getItem('__accesstoken'));

	React.useEffect(() => {
		// getLists();
		// getTasks("");
		// getMe(); 
		// getUserTasks("78b6e861a7ae38b0", "asd");
		// query(localStorage.getItem("__accesstoken") as any)
	}, [])

	if (!token) {
		return (
			<form className="login-button-wrapper">
				<button type="button" onClick={login} className="login-button">Login</button>
			</form>
		);
	}

	return (
		<MSALContext.Provider value={null}>
			{props.children}
		</MSALContext.Provider>
	);
}


export const useAuth = () => {

}
