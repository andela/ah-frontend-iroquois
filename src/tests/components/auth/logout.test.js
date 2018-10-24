import React from 'react';
import Logout from '../../../components/Logout/logout';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

it('should render without crashing logout', () => {
	const store = configureStore()();
	mount(
		<MemoryRouter>
			<Provider store={store}>
				<Logout />
			</Provider>
		</MemoryRouter>);
});
