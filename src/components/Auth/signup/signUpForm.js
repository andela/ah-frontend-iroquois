/* eslint-disable react/no-string-refs,jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import React, {Component} from 'react';
import {Row, Button} from 'react-materialize';
import PropTypes from 'prop-types';
import {notify} from 'react-notify-toast';
import styles from '../../../styles/authStyles/signup.scss';
import {emailValidation, field, generateInput} from '../../../utils/index';

class SignUpForm extends Component {

formHasErrors = true;

constructor(props) {
	super(props);

	this.state = {
		username: '',
		usernameError: '',
		email: '',
		emailError: '',
		password: '',
		passwordError: '',
		confirmPass: '',
		confirmPassError: '',
		visible: false

	};

	this.handleSubmit = this.handleSubmit.bind(this);
}

validateForpassword = (event) => {

	const password = event.target.value;
	this.setState({passwordError: '', visible: true, password});
	this.formHasErrors = false;

	if (password.length === 0) {
		this.setState({passwordError: 'Password is required', visible: false});
		this.formHasErrors = true;
	} else if (password.length < 8) {
		this.setState({passwordError: 'Weak password, must be at least 8 characters', visible: false});
		this.formHasErrors = true;
	} else if (password.search(/\d/) === -1) {
		this.setState({passwordError: 'Weak password, must have at least 1 digit', visible: false});
		this.formHasErrors = true;
	} else if (password.search(/[a-zA-Z]/) === -1) {
		this.setState({passwordError: 'Weak password, must have at least 1 letter', visible: false});
		this.formHasErrors = true;
	}
	return this.formHasErrors;
};

validateForconfirmPass = (event) => {

	const confirmPass = event.target.value;
	const password = this.refs.password.value;
	this.formHasErrors = false;

	this.setState({confirmPassError: '', visible: true, confirmPass});

	this.checkLength(confirmPass, 'confirmPassError', 'Please confirm your password');

	if (confirmPass !== password) {
		this.setState({confirmPassError: 'Password mismatch', visible: false});
		this.formHasErrors = true;
	}
	return this.formHasErrors;
};

checkLength = (lenField, prop, err) => {

	if (lenField.length === 0) {
		const message = {};
		message[prop] = err;

		this.setState({...message, visible: false});
	}
};

validateForusername = (event) => {
	const username = event.target.value;
	this.setState({usernameError: '', visible: true, username});
	this.formHasErrors = false;

	this.checkLength(username, 'usernameError', 'Username is required');

	if (username.length < 5) {
		this.setState({usernameError: 'Username must be at least five characters', visible: false});
		this.formHasErrors = true;
	}
	return this.formHasErrors;
};

validateForemail = (event) => {
	const email = event.target.value;
	this.setState({emailError: '', visible: true, email});
	const data = emailValidation(email, 'emailError', 'visible');
	this.setState(data);
	return data.visible;
};

handleSubmit(event) {

	event.preventDefault();

	const fields = Object.keys(this.refs);
	const resp = fields.filter(inputField => {
		const fun = `validateFor${inputField}`;
		const val = this[fun]({target: {value: this.refs[inputField].value.trim()}});
		return !val;
	});

	return fields.length === resp.length
		? this.props.userSignUpRequest(this.state)
		: notify.show('Please fill in the required fields in the form', 'error', 5000);
}

render() {

	const inputs = [
		['text', 'username', this.state.username, 'username', 'Username', 'account_box', this.state.usernameError], ['text', 'email', this.state.email, 'email', 'Email', 'email', this.state.emailError],
		['password', 'password', this.state.password, 'password', 'Password', 'vpn_key', this.state.passwordError], ['password', 'confirmPass', this.state.confirmPass, 'confirmPass', 'Confirm password', 'vpn_key', this.state.confirmPassError]
	].map(fld => field(fld));
	const signupForm = inputs.map((inputField, index) => generateInput(inputField, index, this));
	return (
		<div>
			<Row className={styles.row}>
				<label className={styles['signup-header']}><b>Sign Up</b></label>
			</Row>
			<div className="row">
				<form className={styles['card-form-signup']} onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="input-field col s12 ">
							{signupForm}
						</div>
					</div>
					<Row style={{padding: '0.75rem'}}><Button className={styles['button-effects']} type='submit' value='Submit'> Sign up </Button></Row>
				</form>
			</div>
		</div>
	);
}
}

SignUpForm.propTypes = {
	userSignUpRequest: PropTypes.func.isRequired
};

export default SignUpForm;
