// import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

import { AuthProvider } from './pages/Auth/';
import { Shopping } from './pages/Shopping/';
import { Test } from './pages/Auth/Test';



ReactDOM.render(
	(
		<AuthProvider>
			<Test />
		</AuthProvider>
	),
	document.getElementById("root")
);
