import ACTION_TYPE from '../constants/constant';
import { Authenticate } from '../../components/ProtectedRoute/PrivateRoute';

export const loginReducer = (state = {loggedIn: Authenticate.isAuthenticated()}, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGIN_SUCCESSFUL:
			return {...state,
				loggedIn: true,
				user_data: action.user
			};
		case ACTION_TYPE.LOGIN_FAILED:
			return {...state,
				loggedIn: false,
				error: action.error
			};
		case ACTION_TYPE.LOGOUT:
			return {...state, loggedIn: false, user_data: {}};
		default:
			return state;
	}
};
