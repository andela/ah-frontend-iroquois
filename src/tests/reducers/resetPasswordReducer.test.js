// Testing reducers
// A reducer should return the new state after applying the action to the previous state

import { PasswordReducer } from '../../reducers/authReducers/passwordReducers';

const initialState = {
	passResetMessageSuccess: '',
	passResetMessageError: '',
	invokePasswordErrorMessage: '',
	invokePasswordSuccessMessage: ''
};

describe('Invoke password reducer', () => {
	it('it should return the initial state', () => {
		expect(PasswordReducer(undefined, {})).toEqual(initialState);
	});

	it('it should handle RESET_PASSWORD_ERROR', () => {
		expect(PasswordReducer({}, {
			type: 'RESET_PASSWORD_ERROR',
			payload: {
				resetError: 'password should contain at least 8 characters'
			}
		})).toEqual({
			passResetMessageError: 'password should contain at least 8 characters',
			passResetMessageSuccess: ''
		});

		expect(PasswordReducer({
			passResetMessageError: '',
			passResetMessageSuccess: 'You have successfully reset your password continue to login'
		}, {
			type: 'RESET_PASSWORD_ERROR',
			payload: {
				resetError: 'password should contain at least 8 characters'
			}
		})).toEqual({
			passResetMessageError: 'password should contain at least 8 characters',
			passResetMessageSuccess: ''
		});
	});

	it('it should handle RESET_PASSWORD_SUCCESS', () => {
		expect(PasswordReducer(initialState, {
			type: 'RESET_PASSWORD_SUCCESS',
			payload: {
				resetSuccess: 'You have successfully reset your password continue to login'
			}
		})).toEqual({
			passResetMessageError: '',
			passResetMessageSuccess: 'You have successfully reset your password continue to login',
			invokePasswordErrorMessage: '',
			invokePasswordSuccessMessage: ''
		});
	});

	it('should handle RESET_PASSWORD_EMAIL_PENDING', () => {
		expect(PasswordReducer(initialState, {
			type: 'RESET_PASSWORD_EMAIL_PENDING'
		})).toEqual({
			passResetMessageError: '',
			passResetMessageSuccess: '',
			invokePasswordErrorMessage: '',
			invokePasswordSuccessMessage: ''
		});
	});
});
