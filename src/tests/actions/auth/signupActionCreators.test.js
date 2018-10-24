import {ACTION_TYPE} from '../../../actions/authActions/actionTypes';
import SignupActionCreator, {userRegistrationFail} from '../../../actions/authActions/signUpActionCreators';

describe('sign up action create.', () => {

	const response = {
		data: {}
	};

	const errors = {
		errors: {}
	};

	const responseData = {
		type: ACTION_TYPE.SIGNUP_SUCCESS,
		payload: response.data,
		visible: false
	};

	const failResponse = {
		type: ACTION_TYPE.SIGNUP_FAIL,
		payload: errors,
		visible: false
	};

	it('should return action type and payload', () => {

		expect(SignupActionCreator(response)).toEqual(responseData);
	});

	it('should show the sign up fails', () => {

		expect(userRegistrationFail(errors)).toEqual(failResponse);

	});
});
