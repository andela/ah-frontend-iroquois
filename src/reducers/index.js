import {combineReducers} from 'redux';
import loginReducer from './authReducers/loginReducer';
import requestLoadingReducer from './requestLoading';
import signupReducer from './authReducers/signupReducer';
import PasswordReducer from './authReducers/passwordReducers';
import socialLoginReducer from './authReducers/socialLogin';
import articlesReducer from './articleReducers/articlesReducers';

const reducers = combineReducers({
	user: loginReducer,
	PasswordReducer,
	socialLoginReducer,
	users: signupReducer,
	requestLoadingReducer,
	articlesReducer
});

export default reducers;
