import requestLoadingAction from './request-loading';
import socialLoginServiceAction from './social-login';

const ACTIONS = {
	requestLoadingAction,
	socialLoginServiceAction
};

export default ACTIONS;

export const PasswordInvokeError = (error) => {
    return {

        type: "INVOKE_RESET_PASSWORD_ERROR",
        payload: {
            error: error
        }
    }
};

export const passwordInvokeSuccess = (success_message) => {
    return {
        type: "INVOKE_RESET_PASSWORD_SUCCESS",
        payload: {
            success: success_message
        }
    }
};

export const resetPasswordError = (message) => {
    return {
        type: "RESET_PASSWORD_ERROR",
        payload: {
            resetError: message
        }
    }
};

export const resetPasswordSuccess = (message) => {
    return {
        type: "RESET_PASSWORD_SUCCESS",
        payload: {
            resetSuccess: message
        }
    }
};

