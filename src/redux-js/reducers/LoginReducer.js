import ACTION_TYPE from '../constants/constant';

export const loginReducer = (state={loggedIn:false}, action) => {
  switch (action.type ){
    case ACTION_TYPE.LOGIN_SUCCESSFUL:
      return {...state,
        loggedIn:true,
        user_data:action.user
      };
    case ACTION_TYPE.LOGIN_FAILED:
        return{...state,
        loggedIn:false,
        error: action.error
        }
    default:
      return state
  };
};
