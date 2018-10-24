import configureStore from 'redux-mock-store';
import {ACTION_TYPE} from '../../../actions/authActions/actionTypes';
import ACTIONS from '../../../actions/authActions/action';

const mockStore = configureStore();

describe('should exhaustively test actions', () => {

	let store;
	let loadingAction;

	beforeEach(() => {

		loadingAction = [{
			type: ACTION_TYPE.REQUEST_LOADING,
			isRequestLoading: false
		}];

		store = mockStore({
			requestLoadingReducer: {
				isRequestLoading: false
			},
			updateRequestLoading: jest.fn()
		});

		store.clearActions();

	});

	it('should return action for loading page', () => {
		store.dispatch(ACTIONS.requestLoadingAction(false));
		expect(store.getActions()).toEqual(loadingAction);
	});

});
