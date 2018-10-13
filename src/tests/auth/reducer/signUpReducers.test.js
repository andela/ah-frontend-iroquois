import {MESSAGE, SIGNUP_FAIL, SIGNUP_START, SIGNUP_STOP, SIGNUP_SUCCESS} from "../../../redux-js/actions/actionTypes";
import signupReducer from "../../../redux-js/reducers/signupReducer";

it('should allow sign up action start', () => {
    const initialState = [{}];

    const action = {
        type: SIGNUP_START,
    };
    const expected = {
        "0":{},
        visible: action.visible,
        payload: action.false

    };

    const newState = signupReducer(initialState, action);
    expect(newState).toEqual(expected);
});


it('should allow sign up action stop', () => {
    const initialState = [{}];

    const action = {
        type: SIGNUP_STOP,
    };
    const expected = {
        "0":{},
        visible: action.visible,
        payload: action.false
    };

    const newState = signupReducer(initialState, action);
    expect(newState).toEqual(expected);
});


it('should allow sign up action success', () => {
    const initialState = [{}];

    const action = {
        type: SIGNUP_SUCCESS,
    };
    const expected = {
        "0":{},
        visible: false,
        payload: undefined
    };

    const newState = signupReducer(initialState, action);
    expect(newState).toEqual(expected);
});


it('should allow sign up action fail', () => {
    const initialState = [{}];

    const action = {
        type: SIGNUP_FAIL,
    };
    const expected = {
        "0":{},
        visible: false
    };

    const newState = signupReducer(initialState, action);
    expect(newState).toEqual(expected);
});


it('should show a message', () => {
    const initialState = [{}];

    const action = {
        type: MESSAGE,
    };
    const expected = {
        "0":{},
        message: action.visible
    };

    const newState = signupReducer(initialState, action);
    expect(newState).toEqual(expected);
});