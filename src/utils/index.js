/* eslint-disable jsx-a11y/label-has-for */
import {Modal} from 'react-materialize';
import React from 'react';
import styles from '../styles/authStyles/login.scss';

export const emailValidation = (email, err, bol) => {

	const resp = {};
	resp[bol] = false;
	if (email.length === 0) {

		resp[err] = 'email is required';
		resp[bol] = true;

	} else if (!email.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]{2,}$/)) {

		resp[err] = 'Invalid email format ';
		resp[bol] = true;
	}

	return resp;
};

export const field = (obj) => ({
	type: obj[0],
	name: obj[1],
	value: obj[2],
	htmlFor: obj[3],
	label: obj[4],
	icon: obj[5],
	error: obj[6],
	id: obj[7],
	divClass: obj[8],
	modalClass: obj[9],
	triggerClass: obj[10],
	triggerText: obj[11],
	props: obj[12],
	component: obj[13]
});

export const generateModal = (attrs) => (
	<div key={attrs.divClass} className={attrs.divClass}>
		<Modal
			id={attrs.id}
			className={attrs.modalClass}
			actions=""
			// eslint-disable-next-line jsx-a11y/anchor-is-valid
			trigger={<a href='#' className={attrs.triggerClass}>{attrs.triggerText}</a>}
		>
			<attrs.component {...attrs.props} />
		</Modal>
	</div>
);

export const generateInput = (inputField, index, obj) => {

	const fn = `validateFor${inputField.name}`;

	return (
		<div className={`input-field col s12 ${inputField.error ? styles.fieldError : ''}`} key={inputField.name + index}>
			<i className={`material-icons prefix ${inputField.error ? styles.prefix : ''} ${inputField.error ? styles.active : ''}`}>{inputField.icon}</i>
			<input
				className="validate"
				type={inputField.type}
				name={inputField.name}
				value={obj.state[inputField.value]}
				onChange={obj[fn]}
				ref={inputField.htmlFor}
			/>
			<label htmlFor={inputField.htmlFor}>{inputField.label}</label>
			<div className={styles.errors}>{inputField.error}</div>
		</div>
	);
};
export const handleChanging = (evt, fun1, func2, obj) => {

	obj.setState({[evt.target.name]: evt.target.value});
	return evt.target.name === 'newPassword'
		? fun1(evt.target.value)
		: func2(evt.target.value);
};
export const validateEmail = (email, obj) => {
	obj.setState({emailError: '', emailHasError: false});

	obj.setState(emailValidation(email, 'emailError', 'emailHasError'));
};
