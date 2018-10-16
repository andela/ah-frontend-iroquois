import axios from 'axios'
import {
    passwordInvokeSuccess,
    resetPasswordError,
    resetPasswordSuccess
} from './action';
import {notify} from 'react-notify-toast';
import {invokeResetPasswordUrl, passwordRedirectUrl, resetPasswordUrl} from '../constants/constant';
import requestLoadingAction from './request-loading';

const NotificationSuccess = (message) => {
	return notify.show(message, "success", 5000);
};

export const NotificationError = (message) => {
	return notify.show(message, "error", 5000);
};


export const PasswordInvokeThunk = (email) => {
    return (dispatch) => {
		window.store.dispatch(requestLoadingAction(true));
        const userData = {
            user: {
                email: email,
                call_back: passwordRedirectUrl
            }
        };

        return axios.post(invokeResetPasswordUrl, userData)
			.then(response => {

                dispatch(passwordInvokeSuccess(response.data.user.message));
				NotificationSuccess(response.data.user.message);
				window.store.dispatch(requestLoadingAction(false));
            }).catch(error => {
                // Give a positive message so that user even when email is not in database.
				dispatch(passwordInvokeSuccess("Check your email for a link"));
				NotificationSuccess("Check your email for a link");
				window.store.dispatch(requestLoadingAction(false));
        })
    }
};


export const ResetPasswordThunk = (new_password, confirm_password, token) => {
    return (dispatch) => {

		if(new_password.trim() !== confirm_password.trim()){
			dispatch(resetPasswordError("Opps!! passwords don't match"));
			NotificationError("Opps!! passwords don't match");
			return;
		}

		// check that email contains both letters and numbers
		if (!(new_password.match(/\d/) && new_password.match(/[a-z]/i))){
			dispatch(resetPasswordError("Password should contain at least one letter and number"));
			// NotificationError("Password should contain at least one letter and number");
			return;
		}


		const userData = {
            user: {
                password: new_password
            }
        };

        let myHeader = {headers: {"Content-Type": "application/json", "Accept": "application/json", "Authorization": "Token " + token}};

		dispatch(requestLoadingAction(true));

        return axios.put(resetPasswordUrl, userData, myHeader)
            .then(response => {
				dispatch(requestLoadingAction(false));

                dispatch(resetPasswordSuccess("Password reset successfully continue to login"));
				NotificationSuccess("Password reset successfully continue to login");

            }).catch(error => {

				dispatch(requestLoadingAction(false));

            if (error.response.data.user){
				dispatch(resetPasswordError("Invalid toke, Please get a fresh password reset link"));
				NotificationError("Invalid toke, Please get a fresh password reset link");
			}else{
				let myResponseArray = error.response.data.errors.password;

				for (let key in myResponseArray) {
					// check if the property/key is defined in the object itself, not in parent
					dispatch(resetPasswordError(myResponseArray[key]));
					NotificationError(myResponseArray[key]);
				}

			}

        })
    };

};




