import renderer from 'react-test-renderer';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import React from 'react';
import ResetPassword from '../../../components/Auth/resetPassword/resetPassword';
import {ResetPasswordThunk} from '../../../actions/authActions/resetPasswordAction';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

let store = configureStore([thunk])({});

jest.mock('react-notify-toast');

describe('should render password reset form', () => {
	it('should render password reset form', () => {
		const tree = renderer.create(
			<BrowserRouter>
				<Provider store={store}>
			<ResetPassword />
					</Provider>
		</BrowserRouter>).toJSON();
		expect(tree).toMatchSnapshot();

	})
});


describe('handle Invoke email for password reset', () => {
	let mockFunc = jest.fn();
	let component;
	beforeEach(() => {
			component = mount(<MemoryRouter>
				<Provider store={store}>
				<ResetPassword
					dispatch={ResetPasswordThunk("newPassword", "confirmPassword", "Token")}/>
				</Provider>
			</MemoryRouter>);

	});

	it('should submit user email without failing', () => {

		expect(mockFunc).toHaveBeenCalledTimes(0);
		component.find('input#newPassword').simulate('change', {target: {name: 'newPassword', value: 'ewrfg'}});
		component.find('input#newPassword').simulate('change', {target: {name: 'newPassword', value: ''}});
		component.find('input#newPassword').simulate('change', {target: {name: 'newPassword', value: '23456uytrews'}});
		component.find('input#newPassword').simulate('change', {target: {name: 'newPassword', value: '23456uytre234de'}});


		component.find('input#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: ''}});
		component.find('input#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: '23456uytrews'}});

		component.find('input#newPassword').simulate('change', {target: {name: 'newPassword', value: '23456uytrews'}});
		component.find('input#confirmPassword').simulate('change', {target: {name: 'confirmPassword', value: '23456uytrews'}});

		component.find('form').simulate('submit');

	})

});

