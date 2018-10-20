import { PasswordReducer } from '../../reducers/authReducers/passwordReducers';

const initialState = {
	invokePasswordErrorMessage: '',
	invokePasswordSuccessMessage: ''

};

const realInitialState = {
	passResetMessageSuccess: '',
	passResetMessageError: '',
	invokePasswordErrorMessage: '',
	invokePasswordSuccessMessage: ''
};

describe('Invoke password reducer', () => {
	it('it should return the initial state', () => {
		expect(PasswordReducer(undefined, {})).toEqual(realInitialState);
	});

	it('it should handle RESET_PASSWORD_ERROR', () => {
		expect(PasswordReducer({}, {
			type: 'INVOKE_RESET_PASSWORD_ERROR',
			payload: {
				error: 'password should contain at least 8 characters'
			}
		})).toEqual({
			invokePasswordErrorMessage: 'password should contain at least 8 characters',
			invokePasswordSuccessMessage: ''
		});

		expect(PasswordReducer({
			invokePasswordErrorMessage: '',
			invokePasswordSuccessMessage: 'Check your email for a link'
		}, {
			type: 'INVOKE_RESET_PASSWORD_ERROR',
			payload: {
				error: 'password should contain at least 8 characters'
			}
		})).toEqual({
			invokePasswordErrorMessage: 'password should contain at least 8 characters',
			invokePasswordSuccessMessage: ''
		});
	});

	it('it should handle INVOKE_RESET_PASSWORD_SUCCESS', () => {
		expect(PasswordReducer(initialState, {
			type: 'INVOKE_RESET_PASSWORD_SUCCESS',
			payload: {
				success: 'Check your email for a link'
			}
		})).toEqual({
			invokePasswordErrorMessage: '',
			invokePasswordSuccessMessage: 'Check your email for a link'
		});
	});

	it('should handle RESET_PASSWORD_EMAIL_PENDING', () => {
		expect(PasswordReducer(initialState, {
			type: 'RESET_PASSWORD_EMAIL_PENDING'
		})).toEqual({
			invokePasswordErrorMessage: '',
			invokePasswordSuccessMessage: ''
		});
	});
});
