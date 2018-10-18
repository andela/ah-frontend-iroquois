
export const AUTH_TOKEN = 'auth_token';
export const USERNAME_KEY = 'username';

const BASE_URL = process.env.API_URL;
const API_URLS = {
	GOOGLE_AUTH: `${BASE_URL}/social/auth/google/`,
	FACEBOOK_AUTH: `${BASE_URL}/social/auth/facebook/`,
	CURRENT_USER: `${BASE_URL}/user/`,
	FETCH_ALL_ARTICLES: `${BASE_URL}/articles/`,
	LOGIN_URL: `${BASE_URL}/users/login/`
};

export default API_URLS;
