const ACTION_TYPE = {
	REQUEST_LOADING: 'REQUEST_LOADING',
	SOCIAL_LOGIN_SUCCESS: 'ADD_SOCIAL_SUCCESS',
	SOCIAL_LOGIN_REDIRECT: 'ADD_SOCIAL_REDIRECT',
	LOGIN_SUCCESSFUL: 'loginUser',
	LOGIN_FAILED: 'userLoginFail'
};
export const resetPasswordUrl = `https://ah-backend-staging.herokuapp.com/api/user/`;
export const invokeResetPasswordUrl = `https://ah-backend-staging.herokuapp.com/api/users/reset/password/`;
export const passwordRedirectUrl = `https://ah-frontend-staging-pr-15.herokuapp.com/#/reset/password`;

export default ACTION_TYPE;
