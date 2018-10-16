import {loginReducer} from './LoginReducer';
import {combineReducers} from "redux";
import requestLoadingReducer from './request-loading';

import {PasswordReducer} from './PasswordReducers';

const reducers = combineReducers({
	user: loginReducer,
	PasswordReducer,
	requestLoadingReducer
});
export default reducers;
