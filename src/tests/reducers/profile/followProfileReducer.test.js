import ACTION_TYPE from '../../../actions/actionTypes';
import followReducer from '../../../reducers/profileReducers/followReducers';

const initialState = {
	following: [],
	followers: []
};

describe('follow reducer', () => {
	it('it should return the initial state', () => {
		expect(followReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle FOLLOW_PROFILE_SUCCESS', (state = initialState) => {
		 const initial = {
			following: [],
			followers: []};

		const expected = {'followers': undefined, 'following': undefined}
;
		const action = {type: ACTION_TYPE.FOLLOW_PROFILE_SUCCESS, payload: {}};

		expect(followReducer(initial, action)).toEqual(expected);
	});

	it('should handle UNFOLLOW_PROFILE_SUCCESS', (state = initialState) => {
		 const initial = {
			following: [],
			followers: []};

		const expected = {'followers': undefined, 'following': undefined};
		const action = {type: ACTION_TYPE.UNFOLLOW_PROFILE_SUCCESS, payload: {}};

		expect(followReducer(initial, action)).toEqual(expected);
	});

	it('should handle FOLLOW_PROFILE_FAILURE 2', () => {
		 const initial = {
			following: [],
			followers: []};

		const expected = {'errorMessage': undefined};
		const action = {type: ACTION_TYPE.FOLLOW_PROFILE_FAILURE, payload: {}};

		expect(followReducer(initial, action)).toEqual(expected);
	});

	it('should handle UNFOLLOW_PROFILE_FAILURE ', () => {
		 const initial = {
			following: [],
			followers: []};

		const expected = {'errorMessage': undefined, 'followers': [], 'following': [], 'successMessage': ''};
		const action = {type: ACTION_TYPE.UNFOLLOW_PROFILE_FAILURE, payload: {}};

		expect(followReducer(initial, action)).toEqual(expected);
	});
});
