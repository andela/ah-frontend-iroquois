import {SIGNUP_FAIL, SIGNUP_SUCCESS} from "../../../redux-js/actions/actionTypes";
import SignupActionCreator, {userRegistrationFail} from "../../../redux-js/actions/signUpActionCreators";

describe('sign up action create.',() =>  {

     const response ={
        data:{}
    };

    const errors ={
        errors:{}
    };

    const responseData ={
        type: SIGNUP_SUCCESS,
        payload : response.data,
        visible: false
    };

    const failResponse ={
        type: SIGNUP_FAIL,
        payload: errors,
        visible: false
    };

    it('should return action type and payload', ()=> {

        expect(SignupActionCreator(response)).toEqual(responseData)
    });

    it('should show the sign up fails', ()=> {

        expect(userRegistrationFail(errors)).toEqual(failResponse)

    });
});
