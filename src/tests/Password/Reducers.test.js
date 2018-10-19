// Testing reducers
// A reducer should return the new state after applying the action to the previous state

import {PasswordReducer} from '../../redux-js/reducers/PasswordReducers';

const initialState = {
	passResetMessageSuccess: "",
	passResetMessageError: "",
	invokePasswordErrorMessage: "",
	invokePasswordSuccessMessage: ""

};

describe("Invoke password reducer", () => {
	it("it should return the initial state", () => {
		expect(PasswordReducer(undefined, {})).toEqual(initialState)
	});

	it("it should handle RESET_PASSWORD_SUCCESS", () => {
		expect(PasswordReducer(initialState, {
			type: "INVOKE_RESET_PASSWORD_SUCCESS",
			payload: {
				success: "Check your email for a link"
			}
		})).toEqual({
			invokePasswordErrorMessage: "",
			invokePasswordSuccessMessage: "Check your email for a link",
			passResetMessageSuccess: "",
			passResetMessageError: ""
		})
	});

	it("should handle RESET_PASSWORD_EMAIL_PENDING", () => {
		expect(PasswordReducer(initialState, {
			type: "RESET_PASSWORD_EMAIL_PENDING",
		})).toEqual({
			invokePasswordErrorMessage: "",
			invokePasswordSuccessMessage: "",
			passResetMessageSuccess: "",
			passResetMessageError: ""
		})
	})
});
