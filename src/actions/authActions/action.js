import requestLoadingAction from './requestLoading';

const ACTIONS = {
	requestLoadingAction
};

export default ACTIONS;

export const PasswordInvokeError = (error) => ({

	type: 'INVOKE_RESET_PASSWORD_ERROR',
	payload: {
		error
	}
});

export const passwordInvokeSuccess = (successMessage) => ({
	type: 'INVOKE_RESET_PASSWORD_SUCCESS',
	payload: {
		success: successMessage
	}
});

export const resetPasswordError = (message) => ({
	type: 'RESET_PASSWORD_ERROR',
	payload: {

		resetError: message
	}
});

export const resetPasswordSuccess = (message) => ({
	type: 'RESET_PASSWORD_SUCCESS',
	payload: {
		resetSuccess: message
	}
});

