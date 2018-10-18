import {shallow} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Facebook from '../Facebook';

const mockStore = configureStore();

describe('Social Auth Buttons', () => {

	let wrapper;
	let props;

	beforeEach(() => {
		const store = mockStore({});

		props = {
			onSocialSuccess: jest.fn(),
			styles: {}
		};
		wrapper = shallow(
			<MemoryRouter initialEntries={['/']}>
				<Provider store={store}>
					<Facebook {...props} />
				</Provider>
			</MemoryRouter>);
	});

	it('should render facebook button', () => {
		expect(wrapper).toHaveLength(1);
		expect(wrapper.find(Facebook)).toHaveLength(1);
	});

	it('should call facebook return', async() => {
		wrapper.find(Facebook);
	});

	it('should test success login', () => {
		const fun = jest.fn();

		const fb = shallow(<Facebook onSocialSuccess={fun} styles={{}} />);
		fb.instance().loginWithFacebook({accessToken: 'dsfgdhfd'});

		expect(fun).toHaveBeenCalledTimes(1);

	});
});
