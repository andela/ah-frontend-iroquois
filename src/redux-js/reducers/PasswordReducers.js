const initialState = {

	invokePasswordErrorMessage: "",
	invokePasswordSuccessMessage: "",
	passResetMessageSuccess: "",
	passResetMessageError: "",

};

export const PasswordReducer = (state=initialState, action) => {
	switch (action.type) {
		case "INVOKE_RESET_PASSWORD_ERROR":
			return {...state,
				invokePasswordErrorMessage: action.payload.error, invokePasswordSuccessMessage: ""};
		case "INVOKE_RESET_PASSWORD_SUCCESS":
			return {...state,
				invokePasswordSuccessMessage: action.payload.success, invokePasswordErrorMessage: ""};
		case "RESET_PASSWORD_SUCCESS":
			return {...state, passResetMessageSuccess: action.payload.resetSuccess, passResetMessageError: ""};

		case "RESET_PASSWORD_ERROR":
			return {...state, passResetMessageError: action.payload.resetError, passResetMessageSuccess: ""};

		default:
			return state
	}

};

