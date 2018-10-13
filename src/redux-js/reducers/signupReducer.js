import {MESSAGE, SIGNUP_FAIL, SIGNUP_START, SIGNUP_STOP, SIGNUP_SUCCESS} from "../actions/actionTypes";

const initialState = {
    visible : false,
    responseData: {},
    errorMessage: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_START:
            return {...state, visible: action.visible,
                payload: action.payload
            };
        case SIGNUP_STOP:
            return {...state, visible: action.visible,
            };
        case SIGNUP_SUCCESS:
            return {...state, visible: false,
                payload: action.payload
            };
        case SIGNUP_FAIL:
            return {...state, visible: false,};
        case MESSAGE:
            return{...state, message: action.message};
        default:
            return state;
    }
};

export default reducer;
