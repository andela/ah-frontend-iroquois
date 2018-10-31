import profileReducer from '../../../reducers/profileReducers/profileReducer';
import ACTION_TYPE from '../../../actions/actionTypes';

const initialState = {
	userName: '',
	firstName: '',
	lastName: '',
	bio: '',
	avatar: '',
	following: [],
	followers: [],
	errorMessage: '',
	successMessage: ''
};

describe('profile reducer', () => {
	it('it should return the initial state', () => {
		expect(profileReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle FETCH_PROFILE_SUCCESS', () => {
		expect(profileReducer({}, {
			type: ACTION_TYPE.FETCH_PROFILE_SUCCESS,
			payload: {
				username: 'username',
				firstName: 'first name',
				lastName: 'last name',
				bio: 'bio',
				avatar: 'avatar',
				followers: [],
				following: []
			}
		})).toEqual({
			userName: 'username',
			firstName: 'first name',
			lastName: 'last name',
			bio: 'bio',
			avatar: 'avatar',
			followers: [],
			following: []
		});
	});

	it('should handle FETCH_PROFILE_FAILURE', () => {
		const errorMessage = 'some thing went wrong';
		expect(profileReducer(initialState, {
			type: ACTION_TYPE.FETCH_PROFILE_FAILURE,
			payload: {
				message: errorMessage
			}
		})).toEqual({
			errorMessage
		});
	});

	it('should handle UPDATE_PROFILE_SUCCESS', () => {
		const message = 'updated successfully';
		expect(profileReducer({}, {
			type: ACTION_TYPE.UPDATE_PROFILE_SUCCESS,
			payload: {
				message
			}
		})).toEqual({successMessage: message, errorMessage: ''});
	});

	it('should handle UPDATE_PROFILE_FAILURE', () => {
		const errorMessage = 'some thing went wrong';
		expect(profileReducer({}, {
			type: ACTION_TYPE.UPDATE_PROFILE_FAILURE,
			payload: {
				message: errorMessage
			}
		})).toEqual({successMessage: '', errorMessage});
	});
});
