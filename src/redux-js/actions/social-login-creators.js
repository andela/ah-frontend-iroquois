import socialLoginServiceAction from './social-login';
import requestLoadingAction from './request-loading';

export const getSocialLoginService =
	(dispatch) =>
		(URL, data, method) =>
			dispatch(socialLoginServiceAction(URL, data, method));

export const getUpdateRequestLoading =
	(dispatch) =>
		(data) => dispatch(requestLoadingAction(data));
