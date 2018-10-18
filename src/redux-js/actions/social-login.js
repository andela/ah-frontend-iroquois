import axios from 'axios';
import { notify } from 'react-notify-toast';
import API_URLS, { AUTH_TOKEN, USERNAME_KEY } from '../../constants';
import requestLoadingAction from './request-loading';

const addToken = () => {
	const TOKEN = localStorage.getItem(AUTH_TOKEN);

	if (TOKEN !== null) {
		// noinspection JSUnresolvedVariable
		axios.defaults.headers.common.Authorization = `Token ${TOKEN}`;
	}
};

export const fetchUser = async() => {

	addToken();

	// noinspection JSUnresolvedFunction
	return axios({method: 'get', url: API_URLS.CURRENT_USER })
		.then(resp => resp.data)
		.then(response => {
			if (response && typeof response === 'object' && response.user) {

				const username = response.user.username.split('_')[0];
				localStorage.setItem(USERNAME_KEY, username);

				window.location.assign('/');
			}
		})
		.catch(error => {
			notify.show(`An Error occurred when trying to log-in. => ${error}`, 'error', 5000);
		});
};

const socialLoginServiceAction = (URL, data = {}, method = 'post') => dispatch => {

	dispatch(requestLoadingAction(true));

	addToken();

	// noinspection JSUnresolvedFunction
	return axios({ method, url: URL, data }).then(resp => resp.data)

		.then(async resp => {
			const token = resp.auth_token ? resp.auth_token : null;

			if (token && URL !== API_URLS.CURRENT_USER) {

				localStorage.setItem(AUTH_TOKEN, token);

				await fetchUser();
			}
			// return resp;
			dispatch(requestLoadingAction(false));
		})
		.catch(error => {
			dispatch(requestLoadingAction(false));

			notify.show(`An Error occurred when trying to log-in. => ${error}`, 'error', 5000);
		});

};

export default socialLoginServiceAction;
