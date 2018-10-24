import {ACTION_TYPE} from './actionTypes';

const SignupActionCreator =(response)=>{

    return {
        'type': ACTION_TYPE.SIGNUP_SUCCESS,
        'payload': response.data,
        'visible': false

    };
}

export const userRegistrationFail = errors => {

    return {
        'type': ACTION_TYPE.SIGNUP_FAIL,
        'payload': errors,
        'visible': false
    };
};

export const messageRegistration =(message)=>{

    return{
        'type': ACTION_TYPE.MESSAGE,
        'message':message
    };
}

export default SignupActionCreator;
