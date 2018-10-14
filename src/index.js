import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import './redux-js/index';
import './components/Auth/Login/css/login.scss';

ReactDOM.render(
	<Provider store={window.store}>
		<App/>
	</Provider>
	, document.getElementById('root'));
