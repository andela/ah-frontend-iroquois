import reduxThunk from 'redux-thunk';
import configurestore from 'redux-mock-store';
import * as moxios from 'moxios';
import {userLoginRequest} from '../../../actions/authActions/loginAction';
import {notify} from 'react-notify-toast';
import {API_URLS} from '../../../constants';


const middlewares = [reduxThunk];
const mockStore = configurestore(middlewares);
notify.show = jest.fn();
const mockData = {
	user: {
		email: 'essa1@andela.com',
		password: 'essa1@andela',

	}
};

const errorMockData = {
	errors: {"name": "is Required"}
};

let store;
describe('login component', () => {

	beforeEach(() => {
		moxios.install();
		store = mockStore({});
	});
	afterEach(() => {
		moxios.uninstall();
	});

	it('should login a user', () => {
		moxios.stubRequest(API_URLS.LOGIN_URL, {
			status: 200,
			response: mockData

		});

		const expectedActions = [
			{
				"type": "REQUEST_LOADING",
				"isRequestLoading": true
			},
			{
				"type": "REQUEST_LOADING",
				"isRequestLoading": false
			},
			{"payload": {
				"user": {
					"email": "essa1@andela.com", "password": "essa1@andela"
				}
				},
				"type": "LOGIN_USER"
			}
				];

		return store.dispatch(userLoginRequest(mockData)
		).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});

	});

    it('should login a user 201', () => {
        moxios.stubRequest(API_URLS.LOGIN_URL, {
            status: 201,
            response: mockData

        });

        const expectedActions = [{"isRequestLoading": true,
			"type": "REQUEST_LOADING"},
			{"payload": {"user": {"email": "essa1@andela.com",
						"password": "essa1@andela"}},
				"type": "LOGIN_USER"}];


        return store.dispatch(userLoginRequest(mockData)
        ).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });

    });
	it('should fail on invalid login', async () => {
		moxios.stubRequest(API_URLS.LOGIN_URL, {
			status: 400,
			response: errorMockData

		});

		const expectedActions =[
			{
				"type": "REQUEST_LOADING",
				"isRequestLoading": true
			},
			{
				"type": "USER_LOGIN_FAIL",
				"payload": {"name": "is Required"}
			},
			{
				"type": "REQUEST_LOADING",
				"isRequestLoading": false
			}
			];

		let data = await store.dispatch(userLoginRequest(mockData)
			).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});

	});
});
