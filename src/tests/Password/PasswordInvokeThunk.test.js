import React from 'react'
import reduxThunk from 'redux-thunk'
import configurestore from 'redux-mock-store'
import * as moxios from "moxios";
import {PasswordInvokeThunk} from "../../redux-js/actions";
import {invokeResetPasswordUrl} from '../../redux-js/constants/constant';

const middlewares = [reduxThunk];
const mockStore = configurestore(middlewares);

jest.mock('react-notify-toast');

const mockData = {
    user:{
        message: "Check your email for a link"
    }
};

let store;

describe ('Email invoke component',()=> {

    beforeEach(() => {
        moxios.install();
		store = mockStore();

    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('should handle REQUEST_LOADING and INVOKE_RESET_PASSWORD_SUCCESS actions',  ()=> {

       moxios.stubRequest(invokeResetPasswordUrl,{
           status: 200,
           response: mockData

       });

       const expectedActions = [
       	{"isRequestLoading": true, "type": "REQUEST_LOADING"},
		   {"payload": {"success": "Check your email for a link"},
			   "type": "INVOKE_RESET_PASSWORD_SUCCESS"},
		   {"isRequestLoading": false, "type": "REQUEST_LOADING"}
		   ];

       return store.dispatch(PasswordInvokeThunk('patrick.kimanje@andela.com')).then(()=> {
           expect(store.getActions()).toEqual(expectedActions)
        });



    });

	it("should handle REQUEST_LOADING and INVOKE_RESET_PASSWORD_ERROR action", () => {
		moxios.stubRequest(invokeResetPasswordUrl,{
			status: 404,
			response: mockData

		});

		const expectedActions = [
			{"isRequestLoading": true, "type": "REQUEST_LOADING"},
			{"payload": {"success": "Check your email for a link"},
				"type": "INVOKE_RESET_PASSWORD_SUCCESS"},
			{"isRequestLoading": false, "type": "REQUEST_LOADING"}
			];

		return store.dispatch(PasswordInvokeThunk('patrick.kimanje@andela.com')).then(()=> {
			expect(store.getActions()).toEqual(expectedActions)
		});

	})
});



