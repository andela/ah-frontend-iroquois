import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

const mockStore = configureStore();

it('renders without crashing', () => {
	const store = mockStore({requestLoadingReducer: {isRequestLoading: true}, users: {visible: false}});
	window.store = store;

	expect(mount(<Provider store={store}><App /></Provider>).find(App)).toHaveLength(1);
});
