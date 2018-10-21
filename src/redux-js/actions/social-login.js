import axios from 'axios';
import { notify } from 'react-notify-toast';
import API_URLS, { AUTH_TOKEN, USERNAME_KEY } from '../../constants';
import requestLoadingAction from './request-loading';
import Login from './LoginActionCreator';

const addToken = () => {
	const TOKEN = localStorage.getItem(AUTH_TOKEN);

	if (TOKEN !== null) {
		// noinspection JSUnresolvedVariable
		axios.defaults.headers.common.Authorization = `Token ${TOKEN}`;
	}
};

export const fetchUser = async(dispatch, history) => {

	addToken();

	// noinspection JSUnresolvedFunction
	return axios({method: 'get', url: API_URLS.CURRENT_USER })
		.then(resp => resp.data)
		.then(response => {
			if (response && typeof response === 'object' && response.user) {

				const username = response.user.username.split('_')[0];
				localStorage.setItem(USERNAME_KEY, username);

				response.user.username = username;

				dispatch(Login({data: response}));

				history.push('/login');
			}
		})
		.catch(error => {
			notify.show(`An Error occurred when trying to log-in. => ${error}`, 'error', 5000);
		});
};

const socialLoginServiceAction = (URL, data = {}, method = 'post', history) => dispatch => {

	dispatch(requestLoadingAction(true));

	// noinspection JSUnresolvedFunction
	return axios({ method, url: URL, data }).then(resp => resp.data)

		.then(async resp => {
			const token = resp.auth_token ? resp.auth_token : null;

			if (token && URL !== API_URLS.CURRENT_USER) {

				localStorage.setItem(AUTH_TOKEN, token);

				await fetchUser(dispatch, history);
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
