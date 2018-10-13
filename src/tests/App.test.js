import React from 'react';
import App from '../App';
import { mount } from 'enzyme';
import { store } from '../redux-js/stores';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

window.store = store;
const mockStore = configureStore();

it('renders without crashing', () => {

	const store = mockStore({requestLoadingReducer: {isRequestLoading: true}, users: {visible: false}});

	expect(mount(<Provider store={store}><App/></Provider>).find(App)).toHaveLength(1);
});
