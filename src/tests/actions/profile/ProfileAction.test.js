import React from 'react';
import reduxThunk from 'redux-thunk';
import configurestore from 'redux-mock-store';
import * as moxios from 'moxios';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import { API_URLS } from '../../../constants';
import { fetchProfile, updateProfile } from '../../../actions/profileActions/profileActions';
import {followProfile} from '../../../actions/profileActions/followActions';
import {FollowersList} from '../../../components/profile/followingList';

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
		avatar: '',
		following: [],
		followers: []
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
					error: 'Username or email already exist, recheck and try again'
				}
			}

		});

		store.clearActions();
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'message': 'Session expired please login again !'},
				'type': 'UPDATE_PROFILE_FAILURE'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}];

		store.dispatch(updateProfile(mockData)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

});

describe('follows user profile', () => {

	beforeEach(() => {
		moxios.install();
		store = mockStore();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should follow user profile without fail', () => {
		const data = {
			userName: ''
		};

		moxios.stubRequest(`${API_URLS.USER_PROFILE_URL}/userName/follow/`, {
			status: 200,
			response: mockData

		});
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {'avatar': '', 'bio': '', 'firstName': '', 'lastName': '', 'username': '', 'following': [], 'followers': []},
				'type': 'FOLLOW_PROFILE_SUCCESS'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}]
		;

		store.dispatch(followProfile(data)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should unfollow user profile without fail', () => {
		const data = {
			shouldFollow: false,
			userName: 'san'
		};

		moxios.stubRequest(`${API_URLS.USER_PROFILE_URL}san/unfollow/`, {
			status: 400,
			response: mockData

		});
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'}, {'isRequestLoading': false, 'type': 'REQUEST_LOADING'}, {'payload': {'message': undefined}, 'type': 'FOLLOW_PROFILE_FAILURE'}]
		;

		store.dispatch(followProfile(data)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should follow user profile action without fail', () => {
		const data = {
			shouldFollow: true,
			userName: 'san'
		};

		moxios.stubRequest(`${API_URLS.USER_PROFILE_URL}san/follow/`, {
			status: 200,
			response: mockData

		});
		const expectedActions = [{'isRequestLoading': true, 'type': 'REQUEST_LOADING'}, {'payload': {'followers': undefined, 'following': undefined}, 'type': 'FOLLOW_PROFILE_SUCCESS'}, {'payload': {'followers': undefined, 'following': undefined}, 'type': 'FOLLOW_PROFILE_SUCCESS'}, {'isRequestLoading': true, 'type': 'REQUEST_LOADING'}];

		store.dispatch(followProfile(data)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should render card', () => {
		mount(<MemoryRouter><FollowersList followers={['werwe', 'werf']} /></MemoryRouter>);
	});
});

