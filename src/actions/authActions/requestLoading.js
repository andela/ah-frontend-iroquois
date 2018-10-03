import ACTION_TYPE from '../actionTypes';

const requestLoadingAction = loading => ({
	type: ACTION_TYPE.REQUEST_LOADING,
	isRequestLoading: loading
});

export default requestLoadingAction;
