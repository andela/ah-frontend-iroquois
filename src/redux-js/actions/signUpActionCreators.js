import {MESSAGE, SIGNUP_FAIL, SIGNUP_SUCCESS} from "./actionTypes";

const SignupActionCreator =(response)=>{

    return {
        'type': SIGNUP_SUCCESS,
        'payload': response.data,
        'visible': false

    };
}

export const userRegistrationFail = errors => {

    return {
        'type': SIGNUP_FAIL,
        'payload': errors,
        'visible': false
    };
};

export const messageRegistration =(message)=>{

    return{
        'type': MESSAGE,
        'message':message
    };
}

export default SignupActionCreator;