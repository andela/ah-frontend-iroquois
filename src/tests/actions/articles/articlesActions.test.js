/* eslint-disable import/no-extraneous-dependencies */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import {API_URLS, AUTH_TOKEN} from '../../../constants';
import {
	createArticleAction,
	deleteArticle,
	editArticle,
	fetchAllArticles
} from '../../../actions/articleActions/articleActions';
import {EnhancerOptions as undefined} from 'redux-devtools-extension';

const mockStore = configureStore([thunk]);
let store = {};
jest.mock('react-notify-toast');

describe('Articles Actions', () => {

	beforeEach(() => {
		moxios.install();
		store = mockStore({});
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should test fetch article', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES, {
			status: 200,
			response: { articles: {}}
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {}, 'type': 'ADD_MANY_FROM_SERVER'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];

		store.dispatch(fetchAllArticles()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test fetch article response error', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES, {
			status: 404,
			response: { articles: {}}
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(fetchAllArticles()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test deleting article', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}why-me/`, {
			status: 202,
			response: { articles: {}}
		});
		const slug = 'why-me';
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'slug': 'why-me'}, 'type': 'DELETE_ONE_ARTICLE'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(deleteArticle(slug, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test deleting article 404 errors', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}why-me/`, {
			status: 404,
			response: { articles: {}}
		});
		const slug = 'why-me';
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(deleteArticle(slug, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test deleting article errors with 401', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}why-me/`, {
			status: 401,
			response: { articles: {}}
		});
		const slug = 'why-me';
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(deleteArticle(slug, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test editing article', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}why-me/`, {
			status: 202,
			response: { articles: {slug: 'why-me'}}
		});
		const article = {slug: 'why-me'};
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'slug': 'why-me'}, 'type': 'DELETE_ONE_ARTICLE'},
			{'payload': {'slug': 'why-me'}, 'type': 'ADD_ONE_ARTICLE'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(editArticle(article, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test editing article with 401', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}why-me/`, {
			status: 401,
			response: { articles: {slug: 'why-me'}}
		});
		const article = {slug: 'why-me'};
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(editArticle(article, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test editing article with 404', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}why-me/`, {
			status: 404,
			response: { articles: {slug: 'why-me'}}
		});
		const article = {slug: 'why-me'};
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(editArticle(article, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test creating article', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}`, {
			status: 200,
			response: { article: {slug: 'why-me'}}
		});
		const article = {slug: 'why-me'};
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'slug': 'why-me'}, 'type': 'ADD_ONE_ARTICLE'},
			{'payload': {'slug': 'why-me'}, 'type': 'VIEW_ONE_ARTICLE'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(createArticleAction(article, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test creating article but response has no article', () => {
		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}`, {
			status: 200,
			response: {}
		});
		const article = {slug: 'why-me'};
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {}, 'type': 'ADD_ONE_ARTICLE'},
			{'payload': {'slug': undefined}, 'type': 'VIEW_ONE_ARTICLE'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(createArticleAction(article, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test creating article with errors', () => {
		localStorage.setItem(AUTH_TOKEN, 'erthtjkhgfdsf');

		moxios.stubRequest(`${API_URLS.FETCH_ALL_ARTICLES}`, {
			status: 404,
			response: {}
		});
		const article = {slug: 'why-me'};
		const history = {push: jest.fn()};

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(createArticleAction(article, history)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
