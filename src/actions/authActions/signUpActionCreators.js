import ACTION_TYPE from '../actionTypes';

const SignupActionCreator = (response) => ({
	'type': ACTION_TYPE.SIGNUP_SUCCESS,
	'payload': response.data,
	'visible': false

});

export const userRegistrationFail = errors => ({
	'type': ACTION_TYPE.SIGNUP_FAIL,
	'payload': errors,
	'visible': false
});

export const messageRegistration = (message) => ({
	'type': ACTION_TYPE.MESSAGE,
	'message': message
});

export default SignupActionCreator;
