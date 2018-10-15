import ACTION_TYPE from '../constants/constant';

const requestLoadingAction = loading => ({
	type: ACTION_TYPE.REQUEST_LOADING,
	isRequestLoading: loading
});

export default requestLoadingAction;
