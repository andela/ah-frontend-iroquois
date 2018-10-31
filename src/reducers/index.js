import {combineReducers} from 'redux';
import loginReducer from './authReducers/loginReducer';
import requestLoadingReducer from './requestLoading';
import signupReducer from './authReducers/signupReducer';
import PasswordReducer from './authReducers/passwordReducers';
import socialLoginReducer from './authReducers/socialLogin';
import profileInfo from './profileReducers/profileReducer';
import articlesReducer from './articleReducers/articlesReducers';
import commentsReducer from './commentReducers/commentsReducers';
import followReducer from './profileReducers/followReducers';

const reducers = combineReducers({
	user: loginReducer,
	PasswordReducer,
	socialLoginReducer,
	users: signupReducer,
	requestLoadingReducer,
	profileInfo,
	articlesReducer,
	commentsReducer,
	followReducer
});

export default reducers;
