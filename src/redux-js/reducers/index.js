import {combineReducers} from 'redux';
import {loginReducer} from './LoginReducer';
import requestLoadingReducer from './request-loading';

const reducers = combineReducers({
	user: loginReducer,
	requestLoadingReducer
});
export default reducers;
