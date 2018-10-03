import ACTION_TYPE from '../../actions/actionTypes';

const initialState = {
	visible: false,
	responseData: {},
	errorMessage: {}
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SIGNUP_START:
			return {
				...state, visible: action.visible,
				payload: action.payload
			};
		case ACTION_TYPE.SIGNUP_STOP:
			return {
				...state, visible: action.visible
			};
		case ACTION_TYPE.SIGNUP_SUCCESS:
			return {
				...state, visible: false,
				payload: action.payload
			};
		case ACTION_TYPE.SIGNUP_FAIL:
			return {...state, visible: false};
		case ACTION_TYPE.MESSAGE:
			return {...state, message: action.message};
		default:
			return state;
	}
};

export default reducer;
