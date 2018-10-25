import React from 'react';
import {mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Authenticate, PrivateRoute } from '../../components/ProtectedRoute/privateRoute';
import { AUTH_TOKEN } from '../../constants/index';
import LandingPage from '../../components/landingPage/landingPage';

it('should render without crashing logout', () => {

	localStorage.setItem(AUTH_TOKEN, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc1LCJleHAiOjE1NDUzMjg1MTh9.3WBFq5YoQtc68Mrva2mzFNzjiR3pafb7MEf4xg9ja24');

	mount(
		<MemoryRouter initialEntries={['/login', '/yets']}>
			<PrivateRoute component={LandingPage} />
		</MemoryRouter>
	);
});

it('should test Authenticate()', () => {
	localStorage.clear();
	expect(Authenticate.isAuthenticated()).toBeFalsy();

	localStorage.setItem(AUTH_TOKEN, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc1LCJleHAiOjE1NDUzMjg1MTh9.3WBFq5YoQtc68Mrva2mzFNzjiR3pafb7MEf4xg9ja24');
	expect(Authenticate.isAuthenticated()).toBeTruthy();
});
