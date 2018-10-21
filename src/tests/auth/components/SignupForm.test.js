import React from 'react'
import {mount, shallow} from 'enzyme'
import SignUpForm from "../../../components/signup/subcomponents/SignUpForm";
import store from '../../../redux-js/stores';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

    const props = {
        userSignUpRequest: jest.fn()
    };

    jest.mock('react-notify-toast');

describe ('signup component',()=> {

    const enzymeWrapper = shallow(<SignUpForm {...props}/>);
    const preventDefault = jest.fn();

    it('should click sign up button ',() => {
      expect(enzymeWrapper.find('form').length).toBe(1);
      expect(enzymeWrapper.find('form').simulate('submit', {preventDefault}));
        expect(preventDefault).toBeCalled();

    });

    it('should render signupAction function',() =>{
        expect(enzymeWrapper.find('userSignUpRequest')).toBeTruthy();
    });

    it('should render signup action function',() =>{
        const currState = {
            username: 'test',
            usernameError:'',
            email:'',
            emailError:'',
            password:'test',
            passwordError:'',
            confirm_password:'',
            confirm_passwordError:'',
            visible: false,
        };

        enzymeWrapper.setState({...currState});

    });

    it('should render signup action function',() =>{
        const currState = {
            username: '',
            usernameError:'',
            email:'',
            emailError:'',
            password:'',
            passwordError:'',
            confirm_password:'',
            confirm_passwordError:'',
            visible: false,
        };

        enzymeWrapper.setState({...currState});
    });

    it('calls validate()', () => {
        let data = {
            username: 'huzaifah2001'+Math.random(),
            email: 'hcch@gmail.com'+Math.random(),
            password: '@LMnnnnnnnnn',
            confirm_password:'@LMnnnnnnnnn'
        };
        let target = {
            name: 'password',
            value: ''
        };

        enzymeWrapper.instance().setState(data);
        enzymeWrapper.find('input').first().simulate('change', {target: target});
        enzymeWrapper.find('input').first().simulate('change', {target: target});

    });

    it('calls validatePassword() signUp', () => {
        let data = {
            username:'mbdhchdbhcdbc',
            usernameError:'',
            email: 'email@mail.com',
            emailError:'',
            password: '',
            passwordError:'',
            confirm_password:'hddcgdc78cjrj',
            confirm_passwordError:'',
            formHasErrors: true
        };
        let target = {
            name: 'password',
            value: ''
        };
        enzymeWrapper.instance().setState(data);
        enzymeWrapper.find('input').first().simulate('change', {target: target});
        enzymeWrapper.find('input').first().simulate('change', {target: target});

    });

    it('calls email() signUp', () => {
        let data = {
            username:'mbdhchdbhcdbc',
            usernameError:'',
            email: '',
            emailError:'',
            password: '',
            passwordError:'hddcgdc78cjrj',
            confirm_password:'hddcgdc78cjrj',
            confirm_passwordError:'',
            formHasErrors: true
        };
        let target = {
            name: 'password',
            value: ''
        };
        enzymeWrapper.instance().setState(data);
        enzymeWrapper.find('input').first().simulate('change', {target: target});
        enzymeWrapper.find('input').first().simulate('change', {target: target});

    });

    it('calls validate methods', () => {

        const enzymeWrapper = mount(<MemoryRouter><Provider store={store}><SignUpForm {...props}/>
			</Provider>
			</MemoryRouter>
			);
        enzymeWrapper.find('input[name="password"]').simulate('change',{target:{name:'password', value:''}});
        enzymeWrapper.find('input[name="password"]').simulate('change',{target:{name:'password', value:'hg'}});
        enzymeWrapper.find('input[name="password"]').simulate('change',{target:{name:'password', value:'hgdasfd2345fvdfg'}});
        enzymeWrapper.find('input[name="password"]').simulate('change',{target:{name:'password', value:'hgdasfdfvdfg'}});

        enzymeWrapper.find('input[name="password"]').simulate('change',{target:{name:'password', value:'234567890876'}});
        enzymeWrapper.find('input[name="confirm_password"]').simulate('change',{target:{name:'confirm_password', value:'dfg'}});
        enzymeWrapper.find('input[name="email"]').simulate('change',{target:{name:'email', value:'hgdasfd2345fvdfg'}});
        enzymeWrapper.find('input[name="username"]').simulate('change',{target:{name:'username', value:'hgdasfd2345fvdfg'}});
        enzymeWrapper.find('form').simulate('submit', {target: {name: 'email', value: 'dfgh@dfg.sdfg'}, preventDefault: jest.fn()});
    });

});
