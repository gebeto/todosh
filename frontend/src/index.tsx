// import '@babel/polyfill';
import "regenerator-runtime/runtime";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.scss';
import CONFIG from './config';

import { Auth } from './pages/Auth/';
import { Shopping } from './pages/Shopping/';


const App = CONFIG.access_token ? Shopping : Auth;


ReactDOM.render(<App/>, document.getElementById("root"));