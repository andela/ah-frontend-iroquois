import React from 'react'
import reduxThunk from 'redux-thunk'
import configurestore from 'redux-mock-store'
import * as moxios from "moxios";
import {PasswordInvokeThunk} from '../../../actions/authActions/resetPasswordAction';
import {API_URLS} from '../../../constants';

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

       moxios.stubRequest(API_URLS.INVOKE_PASSWORD_URL,{
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
		moxios.stubRequest(API_URLS.INVOKE_PASSWORD_URL,{
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



