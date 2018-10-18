import {mount} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import PageLoader from '../PageLoader';

const mockStore = configureStore();

describe('should display loader', () => {

	it('should render loader', () => {
		const store = mockStore({});

		const props = {
			isRequestLoading: true
		};
		const wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				<Provider store={store}>
					<PageLoader {...props} />
				</Provider>
			</MemoryRouter>);

		expect(wrapper.find(PageLoader)).toHaveLength(1);
		expect(wrapper.find(PageLoader).find('div').first()).toHaveLength(1);
	});

	it('should render a loader', () => {
		const store = mockStore({});
		const props = {
			isRequestLoading: false
		};
		const wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				<Provider store={store}>
					<PageLoader {...props} />
				</Provider>
			</MemoryRouter>);

		expect(wrapper.find(PageLoader)).toHaveLength(1);
		expect(wrapper.find(PageLoader).find('div')).toHaveLength(0);
	});
});
