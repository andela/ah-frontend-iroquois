// Test suites for the actions

import {
	PasswordInvokeError,
	passwordInvokeSuccess,
	resetPasswordError,
	resetPasswordSuccess
} from '../../../actions/authActions/action';

describe('actions', () => {
	it('should create an action for a success invoking of password reset mail', () => {
		const successMessage = 'Check your mail for a link';
		const expectedAction = {
			type: 'INVOKE_RESET_PASSWORD_SUCCESS',
			payload: {
				success: successMessage
			}
		};
		expect(passwordInvokeSuccess(successMessage)).toEqual(expectedAction);
	});

	it('should creates an action for a failure in invoking email for password reset', () => {
		const errorMessage = 'kim';
		const expectedAction = {
			type: 'INVOKE_RESET_PASSWORD_ERROR',
			payload: {
				error: errorMessage
			}
		};
		expect(PasswordInvokeError(errorMessage)).toEqual(expectedAction);
	});

	it('should render error when password reset is not successful', () => {
		const resetError = 'password should be at least 8 characters';
		const expectedAction = {
			type: 'RESET_PASSWORD_ERROR',
			payload: {
				resetError
			}
		};
		expect(resetPasswordError(resetError)).toEqual(expectedAction);
	});

	it('should render a success message when password reset is successful', () => {
		const resetSuccess = 'Password has been reset successfully';
		const expectedAction = {
			type: 'RESET_PASSWORD_SUCCESS',
			payload: {
				resetSuccess
			}
		};
		expect(resetPasswordSuccess(resetSuccess)).toEqual(expectedAction);

	});

});
