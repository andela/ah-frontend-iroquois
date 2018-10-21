import socialLoginServiceAction from './social-login';
import requestLoadingAction from './request-loading';

export const getSocialLoginService =
	(dispatch) =>
		(URL, data, method, history = {}) =>
			dispatch(socialLoginServiceAction(URL, data, method, history));

export const getUpdateRequestLoading =
	(dispatch) =>
		(data) => dispatch(requestLoadingAction(data));
