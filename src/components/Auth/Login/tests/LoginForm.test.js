import React from 'react';
import LoginForm from '../LoginForm';
import {shallow} from 'enzyme';

describe('<LoginForm/>', () => {
	const mockFn = jest.fn();
	let component;
	beforeEach(() => {
		component = shallow(<LoginForm userLoginRequest={mockFn}/>);
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
		component.find('form').simulate('submit', {preventDefault: () =>{}});
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('calls handleChanges()', () => {
		let data = {
			email: 'email@mail.com',
			password: 'password',
		};
		let target = {
			name: 'email',
			value: 'password'
		};
		component.instance().setState(data);
		let fn = jest.spyOn(component.instance(), 'handleChange');
		component.find('input').first().simulate('change', {target: target});
		component.find('input').first().simulate('change', {target: target});
		expect(fn).toHaveBeenCalledTimes(1);

	});

	it('calls validateEmail()', () => {
		let data = {
			email: '',
			password: 'password',
			formHasErrors: true
		};
		let target = {
			name: 'email',
			value: ''
		};
		component.instance().setState(data);
		let fn = jest.spyOn(component.instance(), 'handleChange');
		component.find('input').first().simulate('change', {target: target});
		component.find('input').first().simulate('change', {target: target});
		expect(fn).toHaveBeenCalledTimes(1);

	});

	it('calls validatePassword()', () => {
		let data = {
			email: 'email@mail.com',
			password: '',
			formHasErrors: true
		};
		let target = {
			name: 'password',
			value: ''
		};
		component.instance().setState(data);
		let fn = jest.spyOn(component.instance(), 'handleChange');
		component.find('input').first().simulate('change', {target: target});
		component.find('input').first().simulate('change', {target: target});
		expect(fn).toHaveBeenCalledTimes(1);

	});

	it('calls validatePassword()', () => {
		let data = {
			email: 'email@mail.com',
			password: '',
			formHasErrors: true
		};
		let target = {
			name: 'password',
			value: 'k'
		};
		component.instance().setState(data);
		let fn = jest.spyOn(component.instance(), 'handleChange');
		component.find('input').first().simulate('change', {target: target});
		component.find('input').first().simulate('change', {target: target});
		expect(fn).toHaveBeenCalledTimes(1);

	});

	it('calls validatePassword()', () => {
		let data = {
			email: 'email@mail.com',
			password: '',
			formHasErrors: true
		};
		let target = {
			name: 'password',
			value: '123456789'
		};
		component.instance().setState(data);
		let fn = jest.spyOn(component.instance(), 'handleChange');
		component.find('input').first().simulate('change', {target: target});
		component.find('input').first().simulate('change', {target: target});
		expect(fn).toHaveBeenCalledTimes(1);

	});

});


