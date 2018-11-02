import ACTION_TYPE from '../../actions/actionTypes';

const initialState = {
	comments: []
};
export default function commentsReducer(state = initialState, action) {

	switch (action.type) {
		case ACTION_TYPE.GET_COMMENTS:
			return {
				...state,
				comments: action.payload.comments
			};

		default:
			return state;
	}

}
