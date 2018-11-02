import axios from 'axios';
import {notify} from 'react-notify-toast';
import requestLoadingAction from '../authActions/requestLoading';
import {addToken} from '../../utils';
import {API_URLS} from '../../constants';
import {fetchAllArticles} from '../articleActions/articleActions';
import {viewOneArticleActionCreator
} from '../articleActions/articleActionCreators';

export const callThis = async (dispatch, slug, message) => {

	const resp = await dispatch(fetchAllArticles());
	dispatch(viewOneArticleActionCreator(slug));
	notify.show(message, 'success', 5000);
	return resp;
};

export const createCommentAction = (comment, slug) => dispatch => {

	dispatch(requestLoadingAction(true));

	addToken();

	// noinspection JSUnresolvedFunction
	return axios.post(`${API_URLS.FETCH_ALL_ARTICLES}${slug}/comment/`, {comment})
		.then(resp => resp.data)
		.then(async response => {
			// noinspection JSUnresolvedVariable
			callThis(dispatch, slug,'You have created a comment successfully').then();

		}).catch(error => {
			dispatch(requestLoadingAction(false));

			notify.show(`There's a problem with creating a comment .${error}`, 'error', 4000);
		});
};

export const deleteComment = (id,slug) => dispatch => {

	addToken();

	dispatch(requestLoadingAction(true));

	// noinspection JSUnresolvedFunction, JSUnusedLocalSymbols
	return axios.delete(`${API_URLS.FETCH_ALL_ARTICLES}${'comment'}/${id}/`)
		.then( async response => {

			callThis(dispatch, slug,'You have deleted a comment successfully').then();

		})
		.catch(error => {
			// noinspection JSUnresolvedFunction, JSUnusedLocalSymbols
			errorCallback(error, dispatch);
		});
};

export const editCommentAction = (id,comment,slug) => dispatch => {

	addToken();

	dispatch(requestLoadingAction(true));

	// noinspection JSUnresolvedFunction
	return axios.put(`${API_URLS.FETCH_ALL_ARTICLES}${'comment'}/${id}/`, {comment})
		.then(async resp => {
			// noinspection JSUnresolvedVariable

			callThis(dispatch, slug,'You have successfully updated your comment').then();

			$('#foo').modal('close');
		})
		.catch(error => {
			// noinspection JSUnresolvedFunction, JSUnusedLocalSymbols
			errorCallback(error, dispatch);
		});
};
