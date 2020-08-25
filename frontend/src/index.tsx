// import '@babel/polyfill';
import "regenerator-runtime/runtime";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.scss';

import Authenticate from 'react-openidconnect';

import { AuthProvider } from './pages/Auth/';
import { Shopping } from './pages/Shopping/';



ReactDOM.render(
	(
		<AuthProvider>
			<Shopping />
		</AuthProvider>
	),
	document.getElementById("root")
);
