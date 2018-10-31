import axios from 'axios';
import {notify} from 'react-notify-toast';
import requestLoadingAction from '../authActions/requestLoading';
import { API_URLS} from '../../constants';
import ACTION_TYPE from '../actionTypes';
import { addToken } from '../../utils';

const NotificationSuccess = (message) => notify.show(message, 'success', 5000);

const NotificationError = (message) => notify.show(message, 'error', 5000);

export const reportArticleSuccess = (successMessage) => ({

	type: ACTION_TYPE.REPORT_ARTICLE_SUCCESS,
	payload: {
		message: successMessage
	}

});

export const reportArticleFailure = (errorMessage) => ({

	type: ACTION_TYPE.REPORT_ARTICLE_FAILURE,
	payload: {message: errorMessage}

});

export const reportArticle = (props, slug) => (dispatch) => {

	addToken();

	dispatch(requestLoadingAction(true));
	const userData = {
		report_message: props.issue

	};

	return axios.post(`${API_URLS.REPORT_ARTICLE_URL}${slug}/`, userData)
		.then(() => {

			dispatch(reportArticleSuccess('Article reported successfully!'));
			dispatch(requestLoadingAction(false));
			NotificationSuccess('Article reported successfully!');

		}).catch(() => {

			dispatch(reportArticleFailure('An error occurred when reporting the article'));
			dispatch(requestLoadingAction(false));
			NotificationError('An error occurred when reporting the article');

		});

};
