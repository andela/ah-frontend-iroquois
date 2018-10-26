import React from 'react';
import reduxThunk from 'redux-thunk';
import configurestore from 'redux-mock-store';
import * as moxios from 'moxios';
import { API_URLS } from '../../../constants';
import { fetchProfile, updateProfile } from '../../../actions/profileActions/profileActions';

const middlewares = [reduxThunk];
const mockStore = configurestore(middlewares);

jest.mock('react-notify-toast');

const mockData = {
	profile: {
		first_name: '',
		username: '',
		last_name: '',
		location: '',
		bio: '',
		avatar: ''
	}
};

let store;
describe('fetches user profile', () => {

	beforeEach(() => {
		moxios.install();
		store = mockStore();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should fetch user profile without fail', () => {

		moxios.stubRequest(`${API_URLS.USER_PROFILE_URL}${localStorage.getItem('username')}`, {
			status: 200,
			response: mockData

		});
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'avatar': '', 'bio': '', 'firstName': '', 'lastName': '', 'username': ''},
				'type': 'FETCH_PROFILE_SUCCESS'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}]
		;

		store.dispatch(fetchProfile(store.props)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should fail when fetching user profile', () => {
		moxios.stubRequest(`${API_URLS.USER_PROFILE_URL}${localStorage.getItem('username')}`, {
			status: 403,
			response: {
				profile: {
					detail: 'Incomplete authentication details provided'
				}
			}
		});
		store.clearActions();

		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'type': 'FETCH_PROFILE_FAILURE'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}];
		store.dispatch(fetchProfile(store.props)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});

	});

	it('should return 200', () => {
		moxios.stubRequest(API_URLS.UPDATE_PROFILE_URL, {
			status: 200,
			response: mockData

		});

		store.clearActions();
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'message': 'Profile successfully updated!'},
				'type': 'UPDATE_PROFILE_SUCCESS'}, {'isRequestLoading': false,
				'type': 'REQUEST_LOADING'}, {'payload':
					{'avatar': '', 'bio': '', 'firstName': '', 'lastName': '', 'username': ''},
			'type': 'FETCH_PROFILE_SUCCESS'}];
		store.dispatch(updateProfile(mockData)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should return 400', () => {
		moxios.stubRequest(API_URLS.UPDATE_PROFILE_URL, {
			status: 400,
			response: mockData

		});

		store.clearActions();
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'message': 'Invalid toke, Please get a fresh password reset link'},
				'type': 'UPDATE_PROFILE_FAILURE'}, {'isRequestLoading': false,
				'type': 'REQUEST_LOADING'}];

		store.dispatch(updateProfile(mockData)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should return 400', () => {

		moxios.stubRequest(API_URLS.UPDATE_PROFILE_URL, {
			status: 400,
			response: {
				profile: {
					error: "Username or email already exist, recheck and try again"
				}
			}

		});

		store.clearActions();
		const expectedActions = [{"isRequestLoading": true, "type": "REQUEST_LOADING"},
			{"payload": {"message": "Session expired please login again !"},
				"type": "UPDATE_PROFILE_FAILURE"},
			{"isRequestLoading": false, "type": "REQUEST_LOADING"}];

		store.dispatch(updateProfile(mockData)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

});

