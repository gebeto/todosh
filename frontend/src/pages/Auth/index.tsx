import * as Msal from "msal";
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

const msalInstance = new Msal.UserAgentApplication(msalConfig as any);

msalInstance.handleRedirectCallback((error, response) => {
	if (error) {
		alert(JSON.stringify(error));
	}

	if (response && response.tokenType === "access_token") {
		localStorage.setItem("__accesstoken", response.accessToken);
		query(response.accessToken);
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


function query(token: string) {
	var headers = new Headers();
	var bearer = "Bearer " + token;
	headers.append("Authorization", bearer);
	fetch("https://graph.microsoft.com/beta/me/outlook/taskFolders", {method: "GET", headers: headers})
		.then(resp => {
			console.log(resp);
			return resp.json();
		}).then(rs => alert(JSON.stringify(rs)));
}


const MSALContext = React.createContext(null);


export const AuthProvider = (props: any) => {
	const [token, setToken] = React.useState(null);

	React.useEffect(() => {
		setToken(localStorage.getItem('__accesstoken'));
	}, []);

	if (!token) {
		return (
			<form className="login-button-wrapper">
				<button type="button" onClick={login} className="login-button">Login</button>
			</form>
		);
	}

	return (
		<MSALContext.Provider value={token}>
			{props.children}
		</MSALContext.Provider>
	);
}


export const useAuth = () => {

}
