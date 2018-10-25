import axios from 'axios';
import {notify} from 'react-notify-toast';
import {passwordInvokeSuccess, resetPasswordError, resetPasswordSuccess} from './action';
import {API_URLS} from '../../constants';
import requestLoadingAction from './requestLoading';

const NotificationSuccess = (message) => notify.show(message, 'success', 5000);

export const NotificationError = (message) => notify.show(message, 'error', 5000);

export const PasswordInvokeThunk = (email) => (dispatch) => {
	dispatch(requestLoadingAction(true));

	const userData = {
		user: {
			email,
			call_back: API_URLS.PASSWORD_REDIRECT_URL
		}
	};
	return axios.post(API_URLS.INVOKE_PASSWORD_URL, userData)
		.then(response => {

			dispatch(passwordInvokeSuccess(response.data.user.message));
			NotificationSuccess(response.data.user.message);
			dispatch(requestLoadingAction(false));
		// eslint-disable-next-line handle-callback-err
		}).catch(error => {
			// Give a positive message to the user even when email is not in database.
			dispatch(passwordInvokeSuccess('Check your email for a link'));
			NotificationSuccess('Check your email for a link');
			dispatch(requestLoadingAction(false));
		});
};

const asyncFunc = (dispatch, userData, myHeader) => axios.put(API_URLS.RESET_PASSWORD_URL, userData, myHeader)
	.then(response => {
		dispatch(requestLoadingAction(false));

		dispatch(resetPasswordSuccess('Password reset successfully continue to login'));
		NotificationSuccess('Password reset successfully continue to login');

	}).catch(error => {

		dispatch(requestLoadingAction(false));

		if (error.response.data.user) {
			dispatch(resetPasswordError('Invalid toke, Please get a fresh password reset link'));
			NotificationError('Invalid toke, Please get a fresh password reset link');
		}
	});

export const ResetPasswordThunk = (newPassword, confirmPass, token) => (dispatch) => {

	if (newPassword.trim() !== confirmPass.trim()) {
		dispatch(resetPasswordError('Oops!! passwords don\'t match'));
		NotificationError('Oops!! passwords don\'t match');
		return null;
	}

	// check that email contains both letters and numbers
	if (!(newPassword.match(/\d/) && newPassword.match(/[a-z]/i))) {
		dispatch(resetPasswordError('Password should contain at least one letter and number'));
		return null;
	}

	const userData = {
		user: {
			password: newPassword
		}
	};

	const myHeader = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Token ${ token}`
		}
	};

	dispatch(requestLoadingAction(true));

	// Make calls to the API
	return asyncFunc(dispatch, userData, myHeader);
};

