import axios from 'axios';
import {notify} from 'react-notify-toast';
import {addToken} from '../../utils';
import requestLoadingAction from '../authActions/requestLoading';
import {API_URLS} from '../../constants';
import {fetchAllArticles} from './articleActions';
import {viewOneArticleActionCreator} from './articleActionCreators';

const NotificationSuccess = (message) => notify.show(message, 'success', 5000);

const NotificationError = (message) => notify.show(message, 'error', 5000);

export const callFunc = async(dispatch, slug, message) => {

	const resp = await dispatch(fetchAllArticles());
	dispatch(viewOneArticleActionCreator(slug));
	NotificationSuccess(message);
	return resp;

};

const LikeArticlePreference = (slug, preference) => (dispatch) => {

	addToken();
	dispatch(requestLoadingAction(true));

	return axios.post(`${API_URLS.FETCH_ALL_ARTICLES}${slug}/${preference}/`)
		.then(async response => {

			callFunc(dispatch, slug, response.data.message).then();

		}).catch(() => {
			dispatch(requestLoadingAction(false));
			NotificationError('An error occurred while loading data');

		});

};

export default LikeArticlePreference;
