import {
	fetchProfileFailure,
	fetchProfileSuccess, updateProfileFailure,
	updateProfileSuccess
} from '../../../actions/profileActions/profileActions';
import ACTION_TYPE from '../../../actions/actionTypes';

describe('profile actions', () => {
	it('should call FETCH_PROFILE_SUCCESS', () => {
		const payload = {
			profile: {
				username: '',
				first_name: '',
				last_name: '',
				bio: '',
				avatar: ''
			}
		};
		const expectedAction = {
			type: ACTION_TYPE.FETCH_PROFILE_SUCCESS,
			payload: {
				username: '',
				firstName: '',
				lastName: '',
				bio: '',
				avatar: ''
			}

		};
		expect(fetchProfileSuccess(payload)).toEqual(expectedAction);
	});

	it('should call FETCH_PROFILE_FAILURE', () => {
		const failureMessage = 'some thing went wrong';
		const expectedAction = {
			type: ACTION_TYPE.FETCH_PROFILE_FAILURE,
			payload: {
				message: failureMessage
			}
		};
		expect(fetchProfileFailure(failureMessage)).toEqual(expectedAction);
	});

	it('should call UPDATE_PROFILE_SUCCESS', () => {
		const message = 'profile updated successfully';
		const expectedAction = {
			type: ACTION_TYPE.UPDATE_PROFILE_SUCCESS,
			payload: {
				message
			}
		};
		expect(updateProfileSuccess(message)).toEqual(expectedAction);
	});

	it('should call UPDATE_PROFILE_FAILURE', () => {
		const message = 'some thing went wrong';
		const expectedAction = {
			type: ACTION_TYPE.UPDATE_PROFILE_FAILURE,
			payload: {
				message
			}
		};
		expect(updateProfileFailure(message)).toEqual(expectedAction);
	});

});
