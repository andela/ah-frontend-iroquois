import {combineReducers} from 'redux';
import {loginReducer} from './LoginReducer';
import requestLoadingReducer from './request-loading';
import signupReducer from "./signupReducer";

const reducers = combineReducers({
	user: loginReducer,
    users: signupReducer,
	requestLoadingReducer
});
export default reducers;
