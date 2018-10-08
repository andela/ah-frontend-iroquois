import ACTION_TYPE from '../../../../redux-js/constants/constant';
import LoginActionCreator from '../../../../redux-js/actions/LoginActionCreator';

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

});
