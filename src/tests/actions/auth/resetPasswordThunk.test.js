/* eslint-disable no-undef */
import reduxThunk from 'redux-thunk';
import configurestore from 'redux-mock-store';
import * as moxios from 'moxios';
import {ResetPasswordThunk} from '../../../actions/authActions/resetPasswordAction';
import {API_URLS} from '../../../constants';

const middlewares = [reduxThunk];
const mockStore = configurestore(middlewares);

jest.mock('react-notify-toast');

const mockData = {
	user: {
		message: 'Password reset successfully continue to login'
	}
};

let store;
describe('Reset password component', () => {

	beforeEach(() => {
		moxios.install();
		store = mockStore();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should handle RESET_PASSWORD_EMAIL_PENDING and RESET_PASSWORD_SUCCESS actions', () => {

		moxios.stubRequest(API_URLS.RESET_PASSWORD_URL, {
			status: 200,
			response: mockData

		});
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'},
			{'payload': {'resetSuccess': 'Password reset successfully continue to login'},
				'type': 'RESET_PASSWORD_SUCCESS'}]
		;

		store.dispatch(ResetPasswordThunk('Password12', 'Password12', 'Token token')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should return undefined', () => {
		store.clearActions();

		expect(store.dispatch(ResetPasswordThunk('Password12', 'Passw', 'Token token'))).toBeNull();
		expect(store.dispatch(ResetPasswordThunk('Password', 'Password', 'Token token'))).toBeNull();
	});

	it('should return 404', () => {
		moxios.stubRequest(API_URLS.RESET_PASSWORD_URL, {
			status: 400,
			response: mockData

		});

		store.clearActions();

		store.dispatch(ResetPasswordThunk('Password12', 'Password12', 'Token token')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should return 404 with no user', () => {
		moxios.stubRequest(API_URLS.RESET_PASSWORD_URL, {
			status: 400,
			response: {errors: {
				password: {error: 'name'}
			}}

		});

		store.clearActions();

		store.dispatch(ResetPasswordThunk('Password12', 'Password12', 'Token token')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should return 404 with no', () => {
		moxios.stubRequest(API_URLS.RESET_PASSWORD_URL, {
			status: 400,
			response: {errors: {
				password: 'name'
			}}

		});

		store.clearActions();

		store.dispatch(ResetPasswordThunk('Password12', 'Password12', 'Token token')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

});

