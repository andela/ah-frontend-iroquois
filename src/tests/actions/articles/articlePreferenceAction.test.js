import reduxThunk from 'redux-thunk';
import configurestore from 'redux-mock-store';
import * as moxios from 'moxios';
import { API_URLS } from '../../../constants';
import LikeArticlePreference, {callFunc} from '../../../actions/articleActions/articlePreferenceAction';

const middlewares = [reduxThunk];
const mockStore = configurestore(middlewares);

jest.mock('react-notify-toast');

let store;
describe('article preference', () => {

	beforeEach(() => {
		moxios.install();

		store = mockStore({
			props: {
				handleChange: 'handleChange'
			}
		});
		jest.setTimeout(100);
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should like or dislike  article without fail', () => {

		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}${'slug'}/${'preference'}/`, {
			status: 200,
			response: {
				message: 'You no longer dislike this article'
			}

		});
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'}]
		;

		store.dispatch(LikeArticlePreference('slug', 'preference')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should return 400', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}${'slug'}/${'preference'}/`, {
			status: 404,
			response: {
				detail: 'article not found'
			}

		});

		store.clearActions();
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}];

		store.dispatch(LikeArticlePreference('slug', 'preference')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('test function method two', async() => {
		  await expect(callFunc(jest.fn, 'fgh', 'dfgh')).resolves.toBeTruthy();
	});

});
