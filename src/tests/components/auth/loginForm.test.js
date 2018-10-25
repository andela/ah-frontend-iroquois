import React from 'react';

import {mount, shallow} from 'enzyme';
import $ from 'jquery';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import conf from 'redux-mock-store';
import LoginForm from '../../../components/Auth/Login/loginForm';

const store = conf([thunk])({});

describe('<LoginForm/>', () => {
	const mockFn = jest.fn();
	let component;
	beforeEach(() => {
		component = shallow(<LoginForm userLoginRequest={mockFn} />);
	});

	it('renders 1 <LoginForm /> component', () => {
		expect(component).toHaveLength(1);
	});

	it('includes a login form', () => {
		expect(component.find('form.form-login')).toHaveLength(0);
	});

	it('calls handleSubmit() on submit ', () => {
		component.instance().setState({
			email: 'email@mail.com',
			password: 'email@password1',
			formHasErrors: true
		});
		expect(mockFn).toHaveBeenCalledTimes(0);
	});

	it('calls handleChanges()', () => {
		const data = {
			email: 'email@mail.com',
			password: 'password'
		};
		const target = {
			name: 'email',
			value: 'password'
		};
		component.instance().setState(data);
		component.find('input').first().simulate('change', {target});
		component.find('input').first().simulate('change', {target});

	});

	it('calls validateEmail()', () => {
		const data = {
			email: '',
			password: 'password',
			formHasErrors: true
		};
		const target = {
			name: 'email',
			value: ''
		};
		component.instance().setState(data);
		component.find('input').first().simulate('change', {target});
		component.find('input').first().simulate('change', {target});

	});

	it('calls validatePassword()', () => {
		const data = {
			email: 'email@mail.com',
			password: '',
			formHasErrors: true
		};
		const target = {
			name: 'password',
			value: ''
		};
		component.instance().setState(data);
		component.find('input').first().simulate('change', {target});
		component.find('input').first().simulate('change', {target});

	});

	it('calls validatePassword()', () => {
		const data = {
			email: 'email@mail.com',
			password: '',
			formHasErrors: true
		};
		const target = {
			name: 'password',
			value: 'k'
		};
		component.instance().setState(data);
		component.find('input').first().simulate('change', {target});
		component.find('input').first().simulate('change', {target});

	});

	it('calls validatePassword()', () => {
		const data = {
			email: 'email@mail.com',
			password: '',
			formHasErrors: true
		};
		const target = {
			name: 'password',
			value: '123456789'
		};
		component.instance().setState(data);
		component.find('input').first().simulate('change', {target});
		component.find('input').first().simulate('change', {target});

		$.fn.modal = jest.fn();
		component.find('Link').simulate('click');
		expect($.fn.modal).toBeCalledWith('close');

	});

	it('calls validate all fields', () => {

		component = mount(
			<MemoryRouter>
				<Provider store={store}>
					<LoginForm userLoginRequest={mockFn} />
				</Provider>
			</MemoryRouter>);
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: ''}});
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hg'}});
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hgdasfd2345fvdfg'}});
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hgdasfdfvdfg'}});

		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: '234567890876'}});
		component.find('input[name="email"]').simulate('change', {target: {name: 'email', value: 'hgdasfd2345fvdfg'}});
		component.find('form').simulate('submit', {target: {name: 'email', value: 'dfgh@dfg.sdfg'}, preventDefault: jest.fn()});
	});

});
