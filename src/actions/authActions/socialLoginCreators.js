import socialLoginServiceAction from './socialLogin';
import requestLoadingAction from './requestLoading';

export const getSocialLoginService =
	(dispatch) =>
		(URL, data, method, history = {}) =>
			dispatch(socialLoginServiceAction(URL, data, method, history));

export const getUpdateRequestLoading =
	(dispatch) =>
		(data) => dispatch(requestLoadingAction(data));
