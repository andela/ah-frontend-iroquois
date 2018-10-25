import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Logout from '../../../components/Logout/logout';

it('should render without crashing logout', () => {
	const store = configureStore()();
	mount(
		<MemoryRouter>
			<Provider store={store}>
				<Logout />
			</Provider>
		</MemoryRouter>);
});
