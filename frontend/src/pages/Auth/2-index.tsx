import * as React from 'react';
import { AzureAD, AuthenticationState, withAuthentication } from 'react-aad-msal';
import { authProvider } from './msal';
import store from '../../store/';
import { Provider, useSelector } from 'react-redux';


const Test = (props: any) => {
	const u = useSelector((state: any) => state.user);

	React.useEffect(() => {
		console.log('US', u);
		// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoxLCJpc19hZG1pbiI6ZmFsc2UsInN1YiI6MSwiaWF0IjoxNTk4MjU5OTM0fQ.PcoRBvLKf1mST4YD9J3DFp6kWTt_9Dyb0RgWtxnRJ7ypKNsap7T8DN0SFIYhst8DVas3EOKmP1W6Jr7FAdorpQ";
		const token = u && u.jwtIdToken;
		if (token) {
			request("https://outlook.office.com/api/v2.0/me/tasks", token).then((res: any) => console.log("RES", res));
		}
		// console.log("REQQQQQQ");
		// request("https://graph.microsoft.com/beta/tasks").then(res => console.log("RESSSS", res))
	}, [u]);
	console.log('PROPS', props);

	return <div>Hello</div>;
}

const Testt = withAuthentication(Test, {
	provider: authProvider,
	reduxStore: store,
})

const request = async (url: string, token: string) => {
	console.log("TOKEN ", token);

	return fetch(url, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
};


export const Auth = (props: any) => {
	return (
	 	<AzureAD provider={authProvider} forceLogin={false}>
	 		{
 				({login, logout, authenticationState, error, accountInfo}: any) => {
 					console.log('ACCI', accountInfo);
					if (authenticationState === AuthenticationState.Authenticated) {
						return (
							<Provider store={store}>
								<Testt />
							</Provider>
						);
					} else if (authenticationState === AuthenticationState.Unauthenticated) {
						return (
							<div>
								{error && <p><span>An error occured during authentication, please try again!</span></p>}
								<p>
									<span>Hey stranger, you look new!</span>
									<button onClick={login}>Login</button>
								</p>
							</div>
						);
					} else if (authenticationState === AuthenticationState.InProgress) {
						return (<p>Authenticating...</p>);
					}
				}
			}
		</AzureAD>
	);
}
