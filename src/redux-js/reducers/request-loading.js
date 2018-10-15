import ACTION_TYPE from '../constants/constant';

const requestLoadingReducer = (state = {isRequestLoading: false}, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_LOADING:
			return {...state, isRequestLoading: action.isRequestLoading};
		default:
			return state;
	}
};

export default requestLoadingReducer;
