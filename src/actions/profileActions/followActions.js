import axios from 'axios';
import ACTION_TYPE from '../actionTypes';
import requestLoadingAction from '../authActions/requestLoading';
import {API_URLS} from '../../constants';
import {addToken} from '../../utils';
import {fetchProfile} from './profileActions';

export const followProfileSuccess = (userData) => {

	const {following, followers} = userData;

	return {type: ACTION_TYPE.FOLLOW_PROFILE_SUCCESS,
		payload: {
			following,
			followers
		}};

};

export const followProfileFailure = (error) => ({

	type: ACTION_TYPE.FOLLOW_PROFILE_FAILURE,
	payload: {
		message: error
	}

});

export const followProfile = (props) => (dispatch) => {

	addToken();
	dispatch(requestLoadingAction(true));
	const url = props.shouldFollow ? 'follow' : 'unfollow';
	const method = props.shouldFollow ? 'post' : 'delete';

	return axios({method, url: `${API_URLS.USER_PROFILE_URL}${props.userName}/${url}/`})
		.then(response => {
			dispatch(followProfileSuccess('You have followed successfully!'));
			dispatch(followProfileSuccess(response.data));
			dispatch(fetchProfile(props, props.userName));

		}).catch((error) => {
			dispatch(requestLoadingAction(false));
			dispatch(followProfileFailure(error.response.data.error));
		});

};
