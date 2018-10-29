/* eslint-disable camelcase */
import axios from 'axios';
import {notify} from 'react-notify-toast';
import requestLoadingAction from '../authActions/requestLoading';
import { API_URLS, USERNAME_KEY } from '../../constants';
import ACTION_TYPE from '../actionTypes';
import { addToken } from '../../utils';

const NotificationSuccess = (message) => notify.show(message, 'success', 5000);

const NotificationError = (message) => notify.show(message, 'error', 5000);

export const fetchProfileSuccess = (userData) => {

	const {username, first_name, last_name, bio, avatar} = userData.profile;

	return {type: ACTION_TYPE.FETCH_PROFILE_SUCCESS,
		payload: {
			username,
			firstName: first_name,
			lastName: last_name,
			bio,
			avatar
		}};

};

export const fetchProfileFailure = (error) => ({

	type: ACTION_TYPE.FETCH_PROFILE_FAILURE,
	payload: {
		message: error
	}

});

export const updateProfileSuccess = (successMessage) => ({

	type: ACTION_TYPE.UPDATE_PROFILE_SUCCESS,
	payload: {
		message: successMessage
	}

});

export const updateProfileFailure = (errorMessage) => ({

	type: ACTION_TYPE.UPDATE_PROFILE_FAILURE,
	payload: {message: errorMessage}

});

const handleErrors = (dispatch, props, message) => {

	dispatch(requestLoadingAction(false));
	NotificationError(message);
	props.history.push('/logout');

};

export const fetchProfile = (props) => (dispatch) => {

	addToken();
	dispatch(requestLoadingAction(true));
	return axios.get(`${API_URLS.USER_PROFILE_URL}${localStorage.getItem(USERNAME_KEY)}`)
		.then(response => {

			dispatch(fetchProfileSuccess(response.data));
			dispatch(requestLoadingAction(false));

		}).catch(() => {

			dispatch(fetchProfileFailure('An error occurred when retrieving data!'));
			handleErrors(dispatch, props, 'An error occurred when retrieving data!');

		});

};

export const updateProfile = (props, obj) => (dispatch) => {

	addToken();
	dispatch(requestLoadingAction(true));
	const userData = {

		profile: {
			first_name: props.firstName, username: props.userName,
			last_name: props.lastName, location: '',
			bio: props.bio, avatar: props.avatar
		}

	};

	return axios.put(API_URLS.UPDATE_PROFILE_URL, userData)
		.then(response => {

			dispatch(updateProfileSuccess('Profile successfully updated!'));
			dispatch(requestLoadingAction(false));
			localStorage.setItem(USERNAME_KEY, userData.profile.username);
			dispatch(fetchProfileSuccess(response.data));
			NotificationSuccess('Profile successfully updated!');
			obj.history.push('/profile');

		}).catch((error) => {

			dispatch(updateProfileFailure('Session expired please login again !'));

			if (error.response.data.profile.error) {
				dispatch(requestLoadingAction(false));
				NotificationError('Username already taken, please choose another');
			} else { handleErrors(dispatch, obj, 'Session expired please login again !'); }

		});

};
