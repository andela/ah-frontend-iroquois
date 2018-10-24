import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from '../../components/navigation/navBar';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {store} from '../../store';

describe('NavBar', () => {
	it('renders without crashing', () => {
		mount(
			<MemoryRouter>
				<Provider store={store}>
					<NavBar />
				</Provider>

			</MemoryRouter>
		);
	});
});

describe('Logged in user', () => {
	it('shows a custom nav bar when a user is not logged in', () => {

		const nav = mount(
			<MemoryRouter>
				<Provider store={store}>
					<NavBar isLoggedIn />
				</Provider>

			</MemoryRouter>
		);

		const lnav = nav.find('NotLoggedInNav');
		expect(lnav).toHaveLength(1);

		const but = lnav.find('button').first();
		expect(but).toHaveLength(1);

		but.simulate('click');
	});

	it('shows a custom nav bar when a user is logged in', () => {

		const storeMock = configureStore([thunk])({users: {visible: true}, user: {loggedIn: true}});

		const nav = mount(
			<MemoryRouter>
				<Provider store={storeMock}>
					<NavBar isLoggedIn />
				</Provider>

			</MemoryRouter>
		);

		const lnav = nav.find('LoggedInNav');
		expect(lnav).toHaveLength(1);

		const but = lnav.find('button').first();
		expect(but).toHaveLength(1);

		but.simulate('click');
	});
});
