import axios from 'axios';
import  {
    messageRegistration,
    userRegistrationState
} from './signUpActionCreators';

import {notify} from 'react-notify-toast';
import requestLoadingAction from "./request-loading";
import {SIGNUP_URL} from "../../constants/constants";

export function userSignUpRequest(user){

    window.store.dispatch(requestLoadingAction(true));

    return async dispatch => {

        return  await axios.post(SIGNUP_URL,
            {user},

            ).then(response => {
                dispatch(messageRegistration(response.data.user.message));
                window.store.dispatch(requestLoadingAction(false));
                notify.show('SignUp successful.'+response.data.user.message, 'success',6000);

        }).catch(error => {

            let dictionary =error.response.data.errors;
            let message = '';
            let message_key= '';

            for (const key in dictionary) {
                message = dictionary[key];
                message_key = key;
            }
            window.store.dispatch(requestLoadingAction(false));
            notify.show(message.toString().replace('this',message_key), 'error',4000);
        });
    }
}