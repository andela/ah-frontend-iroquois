import ACTION_TYPE from '../../../actions/actionTypes';
import LoginActionCreator, {userLogout} from '../../../actions/authActions/loginActionCreator';

describe('login action creator.', () => {
	const response = {
		data: {}
	};

	const responseData = {
		type: ACTION_TYPE.LOGIN_SUCCESSFUL,
		payload: response.data
	};

	it('should return action type and payload', () => {
		expect(LoginActionCreator(response)).toEqual(responseData);
	});

	it('should test for logout actions', () => {
		const expected = {
			type: ACTION_TYPE.LOGOUT
		};
		expect(userLogout()).toEqual(expected);
	});

});
