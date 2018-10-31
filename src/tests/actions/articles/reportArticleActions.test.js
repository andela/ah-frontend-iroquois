import reduxThunk from 'redux-thunk';
import configurestore from 'redux-mock-store';
import moxios from 'moxios';
import { API_URLS } from '../../../constants';
import ACTION_TYPE from '../../../actions/actionTypes';
import {
	reportArticle,
	reportArticleFailure,
	reportArticleSuccess
} from '../../../actions/articleActions/reportArticleActions';

describe('Report article action creators', () => {

	it('should call REPORT_ARTICLE_FAILURE', () => {
		const failureMessage = 'some thing went wrong';
		const expectedAction = {
			type: ACTION_TYPE.REPORT_ARTICLE_FAILURE,
			payload: {
				message: failureMessage
			}
		};
		expect(reportArticleFailure(failureMessage)).toEqual(expectedAction);
	});

	it('should call REPORT_ARTICLE_SUCCESS', () => {
		const message = 'Article reported successfully!';
		const expectedAction = {
			type: ACTION_TYPE.REPORT_ARTICLE_SUCCESS,
			payload: {
				message
			}
		};
		expect(reportArticleSuccess(message)).toEqual(expectedAction);
	});
});

const middlewares = [reduxThunk];
const mockStore = configurestore(middlewares);

jest.mock('react-notify-toast');

const mockData = {
	issue: ''
};

let store;
describe('Report article actions', () => {

	beforeEach(() => {
		moxios.install();
		store = mockStore();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should return 201', () => {
		moxios.stubRequest(`${API_URLS.REPORT_ARTICLE_URL}slug/`, {
			status: 201,
			response: mockData
		});

		store.clearActions();
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'message': 'Article reported successfully!'},
				'type': 'REPORT_ARTICLE_SUCCESS'}, {'isRequestLoading': false,
				'type': 'REQUEST_LOADING'}];
		store.dispatch(reportArticle(mockData, 'slug')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should return 400', () => {
		moxios.stubRequest(`${API_URLS.REPORT_ARTICLE_URL}slug/`, {
			status: 400,
			response: mockData
		});

		store.clearActions();
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'message': 'An error occurred when reporting the article'},
				'type': 'REPORT_ARTICLE_FAILURE'}, {'isRequestLoading': false,
				'type': 'REQUEST_LOADING'}];
		store.dispatch(reportArticle(mockData, 'slug')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

});
