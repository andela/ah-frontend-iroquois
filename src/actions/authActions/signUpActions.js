import axios from 'axios';
import {notify} from 'react-notify-toast';
import {API_URLS} from '../../constants';
import requestLoadingAction from './requestLoading';
import {messageRegistration} from './signUpActionCreators';

export function userSignUpRequest(user){

    return async dispatch => {
		dispatch(requestLoadingAction(true));
        return  await axios.post(API_URLS.SIGNUP_URL,
            {user},

            ).then(response => {
                dispatch(messageRegistration(response.data.user.message));
                dispatch(requestLoadingAction(false));
                notify.show(response.data.user.message, 'success',6000);

        }).catch(error => {

            let dictionary =error.response.data.errors;
            let message = '';
            let message_key= '';

            for (const key in dictionary) {
                message = dictionary[key];
                message_key = key;
            }
            dispatch(requestLoadingAction(false));
            notify.show(message.toString().replace('this',message_key), 'error',4000);
        });
    }
}
