import configureStore from 'redux-mock-store';
import ACTION_TYPE from '../../constants/constant';
import requestLoadingReducer from '../request-loading';
import '../index';
import '../../stores/index';
import '../../index';

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
});
