import axios from 'axios';
import { notify } from 'react-notify-toast';
import { addToken } from '../../utils/index';
import {
	addManyArticlesActionCreator, addOneArticleActionCreator,
	deleteOneArticleActionCreator, viewOneArticleActionCreator
} from './articleActionCreators';
import requestLoadingAction from '../authActions/requestLoading';
import { API_URLS } from '../../constants';

const errorCallback = (error, dispatch) => {
	dispatch(requestLoadingAction(false));

	if (error.response && error.response.status === 404) {
		notify.show('You do not have permissions to delete this article.', 'error', 5000);
	} else {
		notify.show(`Failed to process this request ${error.message}.`, 'error', 5000);
	}
};

export const fetchAllArticles = (shouldLoad = true, queryParams = '') => dispatch => {

	addToken();

	dispatch(requestLoadingAction(shouldLoad));

	// noinspection JSUnresolvedFunction
	return axios.get(`${API_URLS.FETCH_ALL_ARTICLES}${queryParams}`).then(resp => resp.data)

		.then(resp => {
			// noinspection JSUnresolvedVariable
			const articles = resp.article || resp.articles;

			dispatch(addManyArticlesActionCreator(articles));
			dispatch(requestLoadingAction(false));
		})
		.catch(error => {
			dispatch(requestLoadingAction(false));

			if (shouldLoad) {
				notify.show(`Failed to process the request => ${error}`, 'error', 5000);
			}
		});
};

export const editArticle = (article, history) => dispatch => {

	addToken();

	dispatch(requestLoadingAction(true));

	// noinspection JSUnresolvedFunction
	return axios.put(`${API_URLS.FETCH_ALL_ARTICLES}${article.slug}/`, { article })
		.then(resp => {
			// noinspection JSUnresolvedVariable
			const articleResp = resp.data.article || resp.data.articles;

			dispatch(deleteOneArticleActionCreator(articleResp.slug));
			dispatch(addOneArticleActionCreator(articleResp));
			dispatch(requestLoadingAction(false));

			notify.show('You have successfully updated your article', 'success', 5000);

			history.push(`/articles/${articleResp.slug}`);
		})
		.catch(error => {
			errorCallback(error, dispatch);
		});
};

export const deleteArticle = (slug, history) => dispatch => {

	addToken();

	dispatch(requestLoadingAction(true));

	// noinspection JSUnresolvedFunction, JSUnusedLocalSymbols
	return axios.delete(`${API_URLS.FETCH_ALL_ARTICLES}${slug}/`)
		.then(response => {
			dispatch(deleteOneArticleActionCreator(slug));
			dispatch(requestLoadingAction(false));
			history.push('/articles');
		})
		.catch(error => {
			errorCallback(error, dispatch);
		});
};

export const createArticleAction = (article, history) => dispatch => {

	dispatch(requestLoadingAction(true));

	addToken();

	// noinspection JSUnresolvedFunction
	return axios.post(`${API_URLS.FETCH_ALL_ARTICLES}`, {article})
		.then(resp => resp.data)
		.then(async response => {
			 // noinspection JSUnresolvedVariable
			const articleResp = response.article || {};

			dispatch(addOneArticleActionCreator(articleResp));

			dispatch(viewOneArticleActionCreator(articleResp.slug));

			dispatch(requestLoadingAction(false));

			notify.show('You have created an article successfully', 'success', 5000);

			history.push(`/articles/${articleResp.slug}`);

		}).catch(error => {
			dispatch(requestLoadingAction(false));

			notify.show(`There's a problem with creating an Article.${error}`, 'error', 4000);
		});
};
