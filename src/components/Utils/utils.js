export const emailValidation = (email, err, bol) =>{

	const resp = {};
	resp[bol] = false;
	if (email.length === 0){

		resp[err] = "email is required";
		resp[bol] = true;

	}else if(!email.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]{2,}$/)){

		resp[err] = "Invalid email format ";
		resp[bol] = true;
	}

	return resp;
};

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


