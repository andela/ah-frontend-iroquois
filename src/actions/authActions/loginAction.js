import axios from 'axios';
import {notify} from 'react-notify-toast';
import Login, {userLoginFail} from './loginActionCreator';
import {API_URLS, AUTH_TOKEN} from '../../constants';
import requestLoadingAction from './requestLoading';

const userLoginRequest = (user) => dispatch => {
	dispatch(requestLoadingAction(true));
	return axios.post(API_URLS.LOGIN_URL, {user}
	).then(response => {
		if (response.status === 200) {
			const token = response.data.user.token ? response.data.user.token : null;
			localStorage.setItem(AUTH_TOKEN, token);
			dispatch(requestLoadingAction(false));
			notify.show('You have successfully logged in.', 'success', 4000);
			window.location.assign('/');
		}
		dispatch(Login(response));

	}).catch(error => {
		dispatch(userLoginFail(error.response.data.errors));
		dispatch(requestLoadingAction(false));
		notify.show('Wrong Email/Password', 'error', 4000);

	});

};
export default userLoginRequest;
