import ACTION_TYPE from '../constants/constant';

const Login = (response) => {
	return {
		'type': ACTION_TYPE.LOGIN_SUCCESSFUL,
		'payload': response.data
	};
};

export const userLoginFail = errors => {
	return {
		'type': ACTION_TYPE.LOGIN_FAILED,
		'payload': errors
	};
};
export default Login;
