export const AUTH_TOKEN = 'auth_token';
export const USERNAME_KEY = 'username';
const BASE_URL = process.env.API_URL;
const myLink = window.location.host;
export const API_URLS = {
	GOOGLE_AUTH: `${BASE_URL}/social/auth/google/`,
	FACEBOOK_AUTH: `${BASE_URL}/social/auth/facebook/`,
	CURRENT_USER: `${BASE_URL}/user/`,
	FETCH_ALL_ARTICLES: `${BASE_URL}/articles/`,
	LOGIN_URL: `${BASE_URL}/users/login/`,
	SIGNUP_URL: `${BASE_URL}/users/`,
	RESET_PASSWORD_URL: `${BASE_URL}/user/`,
	INVOKE_PASSWORD_URL: `${BASE_URL}/users/reset/password/`,
	PASSWORD_REDIRECT_URL: `https://${myLink}/#/reset/password`,
	USER_PROFILE_URL: `${BASE_URL}/profile/`,
	UPDATE_PROFILE_URL: `${BASE_URL}/user/update/profile/`
};

