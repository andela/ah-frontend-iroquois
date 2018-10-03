import ACTION_TYPE from '../../actions/actionTypes';
import loginReducer from '../../reducers/authReducers/loginReducer';

it('should allow login action start', () => {
	const initialState = [{}];

	const action = {
		type: ACTION_TYPE.LOGIN_SUCCESSFUL
	};
	const expected = {
		'0': {},
		loggedIn: true,
		user_data: action.user
	};

	const newState = loginReducer(initialState, action);
	expect(newState).toEqual(expected);
});

it('should allow login action start', () => {
	const initialState = [{}];

	const action = {
		type: ACTION_TYPE.LOGIN_FAILED
	};
	const expected = {
		'0': {},
		loggedIn: false,
		error: action.error

	};

	const newState = loginReducer(initialState, action);
	expect(newState).toEqual(expected);
});
