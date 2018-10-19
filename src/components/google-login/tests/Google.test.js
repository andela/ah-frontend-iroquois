import {mount} from 'enzyme';
import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Google from '../Google';

const mockStore = configureStore();

describe('Social Auth Buttons', () => {

	const gGResponse = {tokenId: process.env.GOOGLE_TEST_TOKEN};

	let wrapper;
	let props;

	beforeEach(() => {
		const store = mockStore({});
		props = {
			onSocialSuccess: jest.fn(),
			googleOnFailure: jest.fn(),
			styles: {}
		};
		wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				<Provider store={store}>
					<Google {...props} />
				</Provider>
			</MemoryRouter>);
	});

	it('should render google button', () => {
		expect(wrapper).toHaveLength(1);
		expect(wrapper.find(Google)).toHaveLength(1);
	});

	it('should call google return', async() => {

		const google = wrapper.find(Google);
		google.instance().loginWithGoogle(gGResponse);
		// noinspection JSCheckFunctionSignatures
		jest.spyOn(google.instance(), 'loginWithGoogle');

		expect(google.instance().loginWithGoogle).toHaveBeenCalledTimes(0);
		google.find(GoogleLogin).at(0).simulate('click');
	});
});
