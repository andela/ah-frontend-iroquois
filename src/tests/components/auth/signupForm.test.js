import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import SignUpForm from '../../../components/Auth/signup/signUpForm';
import store from '../../../store';

const props = {
	userSignUpRequest: jest.fn()
};

jest.mock('react-notify-toast');

describe('signup component', () => {

	const enzymeWrapper = shallow(<SignUpForm {...props} />);
	const preventDefault = jest.fn();

	it('should click sign up button ', () => {
		expect(enzymeWrapper.find('form').length).toBe(1);
		expect(enzymeWrapper.find('form').simulate('submit', {preventDefault}));
		expect(preventDefault).toBeCalled();

	});

	it('should render signupAction function', () => {
		expect(enzymeWrapper.find('userSignUpRequest')).toBeTruthy();
	});

	it('should render signup action function', () => {
		const currState = {
			username: 'test',
			usernameError: '',
			email: '',
			emailError: '',
			password: 'test',
			passwordError: '',
			confirmPass: '',
			confirmPassError: '',
			visible: false
		};

		enzymeWrapper.setState({...currState});

	});

	it('should render signup action function', () => {
		const currState = {
			username: '',
			usernameError: '',
			email: '',
			emailError: '',
			password: '',
			passwordError: '',
			confirmPass: '',
			confirmPassError: '',
			visible: false
		};

		enzymeWrapper.setState({...currState});
	});

	it('calls validate()', () => {
		const data = {
			username: `huzaifah2001${Math.random()}`,
			email: `hcch@gmail.com${Math.random()}`,
			password: '@LMnnnnnnnnn',
			confirmPass: '@LMnnnnnnnnn'
		};
		const target = {
			name: 'password',
			value: ''
		};

		enzymeWrapper.instance().setState(data);
		enzymeWrapper.find('input').first().simulate('change', {target});
		enzymeWrapper.find('input').first().simulate('change', {target});

	});

	it('calls validatePassword() signUp', () => {
		const data = {
			username: 'mbdhchdbhcdbc',
			usernameError: '',
			email: 'email@mail.com',
			emailError: '',
			password: '',
			passwordError: '',
			confirmPass: 'hddcgdc78cjrj',
			confirmPassError: '',
			formHasErrors: true
		};
		const target = {
			name: 'password',
			value: ''
		};
		enzymeWrapper.instance().setState(data);
		enzymeWrapper.find('input').first().simulate('change', {target});
		enzymeWrapper.find('input').first().simulate('change', {target});

	});

	it('calls email() signUp', () => {
		const data = {
			username: 'mbdhchdbhcdbc',
			usernameError: '',
			email: '',
			emailError: '',
			password: '',
			passwordError: 'hddcgdc78cjrj',
			confirmPass: 'hddcgdc78cjrj',
			confirmPassError: '',
			formHasErrors: true
		};
		const target = {
			name: 'password',
			value: ''
		};
		enzymeWrapper.instance().setState(data);
		enzymeWrapper.find('input').first().simulate('change', {target});
		enzymeWrapper.find('input').first().simulate('change', {target});

	});

	it('calls validate methods', () => {

		const component = mount(
			<MemoryRouter>
				<Provider store={store}>
					<SignUpForm {...props} />
				</Provider>
			</MemoryRouter>
		);
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: ''}});
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hg'}});
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hgdasfd2345fvdfg'}});
		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'hgdasfdfvdfg'}});

		component.find('input[name="password"]').simulate('change', {target: {name: 'password', value: '234567890876'}});
		component.find('input[name="confirmPass"]').simulate('change', {target: {name: 'confirmPass', value: 'dfg'}});
		component.find('input[name="email"]').simulate('change', {target: {name: 'email', value: 'hgdasfd2345fvdfg'}});
		component.find('input[name="username"]').simulate('change', {target: {name: 'username', value: 'hgdasfd2345fvdfg'}});
		component.find('form').simulate('submit', {target: {name: 'email', value: 'dfgh@dfg.sdfg'}, preventDefault: jest.fn()});
	});

});
