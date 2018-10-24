import { combineReducers } from 'redux';
import { loginReducer } from './authReducers/loginReducer';
import requestLoadingReducer from './requestLoading';
import signupReducer from './authReducers/signupReducer';
import { PasswordReducer } from './authReducers/passwordReducers';
import socialLoginReducer from './authReducers/socialLogin';

const reducers = combineReducers({
	user: loginReducer,
	PasswordReducer,
	socialLoginReducer,
	users: signupReducer,
	requestLoadingReducer
});

export default reducers;
