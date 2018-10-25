import axios from 'axios';
import {notify} from 'react-notify-toast';
import {API_URLS} from '../../constants';
import requestLoadingAction from './requestLoading';
import {messageRegistration} from './signUpActionCreators';

function userSignUpRequest(user) {

	return dispatch => {
		dispatch(requestLoadingAction(true));
		return axios.post(API_URLS.SIGNUP_URL,
			{user}
		).then(response => {
			dispatch(messageRegistration(response.data.user.message));
			dispatch(requestLoadingAction(false));
			notify.show(response.data.user.message, 'success', 6000);

		}).catch(error => {

			const dictionary = error.response.data.errors;

			const errs = Object.keys(dictionary).map(key => dictionary[key]);
			const message = errs && errs.length > 1 ? errs[0] : errs;

			dispatch(requestLoadingAction(false));
			notify.show(message, 'error', 4000);
		});
	};
}
export default userSignUpRequest;
