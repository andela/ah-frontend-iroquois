import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import sinon from 'sinon';

import {
	getSocialLoginService,
	getUpdateRequestLoading
} from '../social-login-creators';
import API_URLS, { AUTH_TOKEN, USERNAME_KEY } from '../../../constants';
import socialLoginServiceAction, { fetchUser } from '../social-login';

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('react-notify-toast');
sinon.stub(window.location, 'assign');

describe('Social Actions', () => {

	let store;
	let onFulfilled;
	const dataR = {
		user: {
			auth_token: 'sdfdffgbjjgh'
		}
	};

	beforeEach(() => {
		// noinspection JSUnusedLocalSymbols
		moxios.install();
		store = mockStore({});
		store.clearActions();
		localStorage.clear();

		onFulfilled = sinon.spy((ev) => {
			console.log(ev);
		});
	});

	afterEach(() => moxios.uninstall());

	it('should renders SocialRender component', () => {

		expect(typeof getUpdateRequestLoading(store.dispatch)).toEqual(typeof jest.fn());
		getUpdateRequestLoading(store.dispatch)();

		expect(typeof getSocialLoginService(store.dispatch)).toEqual(typeof jest.fn());
		getSocialLoginService(store.dispatch)();

	});

	it('should mock user request', () => {

		moxios.stubRequest(API_URLS.GOOGLE_AUTH, {
			status: 200,
			response: {auth_token: 'ertyuioasdfghjklzxcvbnm'}
		});

		store.dispatch(socialLoginServiceAction(API_URLS.GOOGLE_AUTH, dataR)).then(onFulfilled);
	});

	it('should return no token but current user URL', () => {
		moxios.stubRequest(API_URLS.CURRENT_USER, {
			status: 200,
			response: {error: ''}
		});
		store.dispatch(socialLoginServiceAction(API_URLS.CURRENT_USER, dataR)).then(() => {
			expect(localStorage.getItem(AUTH_TOKEN)).toBe(null);
		});
	});

	it('should return error notification', () => {

		expect(localStorage.getItem(AUTH_TOKEN)).toBe(null);

		moxios.stubRequest(API_URLS.FACEBOOK_AUTH, {
			status: 400,
			response: {}
		});
		store.dispatch(socialLoginServiceAction(API_URLS.FACEBOOK_AUTH, dataR)).then(() => {
			expect(localStorage.getItem(AUTH_TOKEN)).toBe(null);
		});
	});

	it('should return 404', async() => {

		localStorage.clear();

		moxios.stubRequest(API_URLS.CURRENT_USER, {
			status: 400,
			response: {error: 'invalid token'}
		});
		await fetchUser().then(() => {
			expect(localStorage.getItem(USERNAME_KEY)).toBe(null);
		});
	});

	it('should return current user', async() => {

		localStorage.setItem(AUTH_TOKEN, 'rtygjkhgfxgchvjbgcx');

		moxios.stubRequest(API_URLS.CURRENT_USER, {
			status: 200,
			response: {user: {username: 'santos'}}
		});
		await fetchUser(store.dispatch, {push: jest.fn()}).then(() => {
			expect(localStorage.getItem(USERNAME_KEY)).toEqual('santos');
		});
	});

	it('should return none, user not in the response', async() => {

		localStorage.setItem(AUTH_TOKEN, 'rtygjkhgfxgchvjbgcx');

		moxios.stubRequest(API_URLS.CURRENT_USER, {
			status: 200,
			response: {}
		});
		await fetchUser().then(() => {
			expect(localStorage.getItem(USERNAME_KEY)).toBe(null);
		});
	});

});
