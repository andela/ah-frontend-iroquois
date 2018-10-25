import ACTION_TYPE from './actionTypes';

const Login = (response) => ({
	'type': ACTION_TYPE.LOGIN_SUCCESSFUL,
	'payload': response.data
});

export const userLoginFail = errors => ({
	'type': ACTION_TYPE.LOGIN_FAILED,
	'payload': errors
});

export const userLogout = () => ({
	'type': ACTION_TYPE.LOGOUT
});

export default Login;
