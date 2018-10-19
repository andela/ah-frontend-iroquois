import React from 'react';
import ReactDOM from 'react-dom';
import './redux-js/index';
import './components/Auth/Login/css/login.scss';
import {Provider} from 'react-redux';
import App from './App';


ReactDOM.render(

	<Provider store={window.store}>
		<App/>
	</Provider>
	, document.getElementById('root'));
