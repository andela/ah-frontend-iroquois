import {emailValidation} from "../../utils/utils";

export const handleChanging = (evt, fun1, func2, obj) =>{

	obj.setState({[evt.target.name]: evt.target.value});
	evt.target.name === 'newPassword'
		? fun1(evt.target.value)
		: func2(evt.target.value);
};

export const validateEmail = (email, obj) => {
	obj.setState({emailError: '', emailHasError: false});

	obj.setState(emailValidation(email, 'emailError', 'emailHasError'));
};


