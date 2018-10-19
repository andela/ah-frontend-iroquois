import ACTION_TYPE from '../constants/constant';

const initialState = {
	errors: null,
	response: {},
	redirect: false,
	to: '/'
};

const socialLoginReducer = (state = initialState, action) => {

	switch (action.type) {
		case ACTION_TYPE.SOCIAL_LOGIN_SUCCESS:
			return {
				...state,
				errors: null,
				redirect: true,
				response: {...state.response, ...action.payload}
			};
		case ACTION_TYPE.SOCIAL_LOGIN_REDIRECT:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

export default socialLoginReducer;
