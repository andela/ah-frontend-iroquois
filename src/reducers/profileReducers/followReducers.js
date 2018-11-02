import ACTION_TYPE from '../../actions/actionTypes';

const initialState = {
	following: [],
	followers: []
};

const followReducer = (state = initialState, action) => {
	const {payload} = action;
	switch (action.type) {
		case ACTION_TYPE.FOLLOW_PROFILE_SUCCESS:
			return { ...state,
				following: payload.following,
				followers: payload.followers
			};

		case ACTION_TYPE.FOLLOW_PROFILE_FAILURE:
			return {
				errorMessage: payload.message
			};

		case ACTION_TYPE.UNFOLLOW_PROFILE_SUCCESS:
			return { ...state,
				following: payload.following,
				followers: payload.followers
			};

		case ACTION_TYPE.UNFOLLOW_PROFILE_FAILURE:
			return {...state,
				errorMessage: payload.message, successMessage: ''};

		default:
			return state;
	}
};

export default followReducer;
