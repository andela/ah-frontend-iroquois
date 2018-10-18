import configureStore from 'redux-mock-store';
import ACTION_TYPE from '../../constants/constant';
import requestLoadingReducer from '../request-loading';
import '../index';
import '../../stores/index';
import '../../index';
import socialLoginReducer from '../social-login'; // redux-js index file

const mockStore = configureStore();

describe('reducers tests', () => {

	let store;
	let loadingAction;

	beforeEach(() => {

		loadingAction = [{
			type: ACTION_TYPE.REQUEST_LOADING,
			isRequestLoading: true
		}];

		store = mockStore({});

		store.clearActions();

	});

	it('should have initial state for loader', () => {
		expect(requestLoadingReducer(undefined, {})).toEqual({isRequestLoading: false});
		expect(requestLoadingReducer(undefined, loadingAction[0])).toEqual({isRequestLoading: true});
	});

	it('should have initial state for social reducer', () => {

		const initial = { errors: null, response: {}, redirect: false, to: '/' };
		const actionRedirect = {
			type: ACTION_TYPE.SOCIAL_LOGIN_REDIRECT,
			payload: {}

		};
		const actionSuccess = {
			type: ACTION_TYPE.SOCIAL_LOGIN_SUCCESS,
			payload: {}
		};

		expect(socialLoginReducer(initial, {})).toEqual(initial);

		expect(socialLoginReducer(undefined, actionRedirect)).toEqual(initial);
		expect(socialLoginReducer(undefined, actionSuccess))
			.toEqual({...initial, redirect: true});
	});

});
