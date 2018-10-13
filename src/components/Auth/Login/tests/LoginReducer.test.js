import ACTION_TYPE from '../../../../redux-js/constants/constant';
import {loginReducer} from '../../../../redux-js/reducers/LoginReducer';

it('should allow Login action start', () => {
    const initialState = [{}];

    const action = {
        type: ACTION_TYPE.LOGIN_SUCCESSFUL,
    };
    const expected = {
        "0":{},
        loggedIn:true,
        user_data:action.user
    };

    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(expected);
});

it('should allow Login action start', () => {
    const initialState = [{}];

    const action = {
        type: ACTION_TYPE.LOGIN_FAILED,
    };
    const expected = {
        "0":{},
        loggedIn:false,
        error:action.error

    };

    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(expected);
});
