import React from 'react'
import reduxThunk from 'redux-thunk'
import configurestore from 'redux-mock-store'
import * as moxios from "moxios";
import {userSignUpRequest} from "../../../redux-js/actions/signUpActions";
import {SIGNUP_URL} from "../../../constants/constants";

const middlewares = [reduxThunk];
const mockStore = configurestore(middlewares);

jest.mock('react-notify-toast');

const mockData = {
    user:{
        username: 'huxaiphaeridris@gmail.com',
        email:'huxaiphaeridris@gmail.com',
        password:'QW123456789'
    }
};

const errorsmockData = {
    errors:{}

};

let store;

describe ('signup component',()=> {

    beforeEach(() => {
        moxios.install();
        store = mockStore();
        window.store = store;
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('should create a user',  ()=> {

       moxios.stubRequest(SIGNUP_URL,{
           status: 201,
           response: mockData

       });

       const expectedActions =   [{"isRequestLoading": true, "type": "REQUEST_LOADING"},
           {"message": undefined, "type": "MESSAGE"}, {"isRequestLoading": false, "type": "REQUEST_LOADING"}];

        return store.dispatch(userSignUpRequest(mockData)).then(()=> {
           expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('should fail with invalid sign up data',  ()=> {

        moxios.stubRequest(SIGNUP_URL,{
            status: 400,
            response: errorsmockData

        });

        const expectedActions =  [{"isRequestLoading": true, "type": "REQUEST_LOADING"}, 
            {"isRequestLoading": false, "type": "REQUEST_LOADING"}];

        store.dispatch(userSignUpRequest(mockData)).then(()=> {
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('should return an error', () => {
        moxios.stubRequest(SIGNUP_URL,{
            status: 400,
            response: {errors: {name: "idris"}}
        });

        const expectedActions =  [{"isRequestLoading": true, "type": "REQUEST_LOADING"},
            {"isRequestLoading": false, "type": "REQUEST_LOADING"}];

        store.dispatch(userSignUpRequest(mockData)).then(()=> {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
});
