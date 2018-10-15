import React from 'react';
import {mount} from 'enzyme';
import NavBar from '../../components/navigation/NavBar';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux-js/stores/index';

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
	it('shows a custom nav bar when a user is logged in', () => {

		const nav = mount(
			<MemoryRouter>
				<Provider store={store}>
					<NavBar isLoggedIn={true}/>
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
