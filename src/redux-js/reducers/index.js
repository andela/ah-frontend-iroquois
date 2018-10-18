import {combineReducers} from 'redux';
import {loginReducer} from './LoginReducer';
import requestLoadingReducer from './request-loading';

import {PasswordReducer} from './PasswordReducers';
import socialLoginReducer from './social-login';

const reducers = combineReducers({
	user: loginReducer,
	PasswordReducer,
	requestLoadingReducer,
	socialLoginReducer,
});

export default reducers;
