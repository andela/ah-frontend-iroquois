import {combineReducers} from 'redux';
import {loginReducer} from './LoginReducer';
import requestLoadingReducer from './request-loading';
import signupReducer from "./signupReducer";
import {PasswordReducer} from './PasswordReducers';
import socialLoginReducer from './social-login';

const reducers = combineReducers({
	user: loginReducer,
	PasswordReducer,
	socialLoginReducer,
    users: signupReducer,
	requestLoadingReducer
});

export default reducers;
