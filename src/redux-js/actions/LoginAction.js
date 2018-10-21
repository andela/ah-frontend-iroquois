import React from 'react';
import axios from 'axios';
import Login, {userLoginFail} from './LoginActionCreator';
import {notify} from 'react-notify-toast';
import requestLoadingAction from './request-loading';
import API_URLS, {AUTH_TOKEN} from '../../constants';

export const userLoginRequest = (user) => {
	window.store.dispatch(requestLoadingAction(true));
	return async dispatch => {
		return await axios.post(API_URLS.LOGIN_URL, {user}
		).then(response => {
			if (response.status === 200) {
				const token = response.data.user.token? response.data.user.token: null;
				localStorage.setItem(AUTH_TOKEN, token);
				window.store.dispatch(requestLoadingAction(false));
				notify.show('You have successfully logged in.','success',4000);
				window.location.assign('/');
			}
			dispatch(Login(response)
			  );

		}).catch(error => {
			dispatch(userLoginFail(error.response.data.errors));
			window.store.dispatch(requestLoadingAction(false));
            notify.show('Wrong Email/Password', 'error',4000);

		});

	};
};
