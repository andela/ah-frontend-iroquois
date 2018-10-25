import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SocialRender, { SocialRenderTest } from '../../../components/Auth/Login/socialLogin/socialButtons';

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('react-notify-toast');

describe('Social auth Buttons', () => {

	let wrapper;
	let store;
	const data = {
		requestLoadingReducer: {
			isRequestLoading: false
		},
		history: {
			push: jest.fn()
		},
		socialLoginReducer: {
			errors: null,
			response: {},
			redirect: false,
			to: '/'
		},
		socialLoginService: jest.fn(),
		updateRequestLoading: jest.fn()
	};

	beforeEach(() => {
		// noinspection JSUnusedLocalSymbols
		store = mockStore(data);

		wrapper = shallow(<SocialRenderTest {...data} />);

	});

	it('should renders SocialRender component', () => {
		expect(wrapper).toHaveLength(1);
	});

	it('should test redux props', () => {
		wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				<Provider store={store}>
					<SocialRender />
				</Provider>
			</MemoryRouter>);
	});

	it('should return response from server', async() => {

		// store.dispatch(socialLoginServiceAction({redirect: true}));

		const response = {
			accessToken: 'qwertyui',
			idToken: 'qwertyuiopokjhgfd'
		};
		wrapper.instance().googleOnFailure({ error: '' });
		wrapper.instance().onSocialSuccess(response, 'facebook');
		wrapper.instance().onSocialSuccess(response, 'google');

		wrapper.instance().onSocialSuccess({}, 'google');

	});

});
