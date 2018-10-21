import React from 'react';
import ReactDOM from 'react-dom';
import './components/Auth/Login/css/login.scss';
import {Provider} from 'react-redux';
import App from './App';
import store from './redux-js/stores';


ReactDOM.render(

	<Provider store={store}>
		<App/>
	</Provider>
	, document.getElementById('root'));
