import React from 'react';
import InvokePasswordResetEmail from "../../components/Password/InvokePasswordResetEmail";
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import conf from 'redux-mock-store';

import {PasswordInvokeThunk} from '../../redux-js/actions';

const props = {
	data: {
		PasswordReducer: {
			invokePasswordErrorMessage: "",
			invokePasswordSuccessMessage: ""
		}
	}
};

const store = conf([thunk])({});

describe("Check loader has class", () => {

	it("renders correctly", () => {
		const tree = renderer.create(<BrowserRouter><Provider store={store}><InvokePasswordResetEmail {...props}/></Provider></BrowserRouter>).toJSON();
		expect(tree).toMatchSnapshot();

		mount(
			<MemoryRouter>
			<Provider store={store}>
			<InvokePasswordResetEmail {...props}/>
			</Provider>
		</MemoryRouter>);
	});


});

describe('handle Invoke email for password reset', () => {
    let component;

    beforeEach(() => {
		component = mount(<MemoryRouter>
			<Provider store={store}>
				<InvokePasswordResetEmail dispatch={PasswordInvokeThunk("email@g.com")}/>
			</Provider>
		</MemoryRouter>);

    });


	it('should submit user email without failing', () => {

		component.find('input#email').simulate('change', {target: {name: 'email', value: 'ewrfg'}});
		component.find('input#email').simulate('change', {target: {name: 'email', value: ''}});
		component.find('input#email').simulate('change', {target: {name: 'emailEr', value: ''}});
		component.find('input#email').simulate('change', {target: {name: 'email', value: 'sdfg@dfg'}});

		component.find('form').simulate('submit');

	})

});


