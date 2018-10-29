import ACTION_TYPE from '../../actions/actionTypes';

const initialState = {
	userName: '',
	firstName: '',
	lastName: '',
	bio: '',
	avatar: '',
	errorMessage: '',
	successMessage: ''
};

const profileReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case ACTION_TYPE.FETCH_PROFILE_SUCCESS:
			return { ...state,
				userName: payload.username,
				firstName: payload.firstName,
				lastName: payload.lastName,
				bio: payload.bio,
				avatar: payload.avatar
			};

		case ACTION_TYPE.FETCH_PROFILE_FAILURE:
			return {
				errorMessage: payload.message
			};

		case ACTION_TYPE.UPDATE_PROFILE_FAILURE:
			return {...state,
				errorMessage: payload.message, successMessage: ''};

		case ACTION_TYPE.UPDATE_PROFILE_SUCCESS:
			return {...state,
				successMessage: payload.message, errorMessage: ''};

		default:
			return state;
	}
};

export default profileReducer;
