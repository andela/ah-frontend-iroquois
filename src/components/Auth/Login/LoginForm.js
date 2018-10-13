import React, {Component} from 'react';
import styles from './css/login.scss';
import {emailValidation, field, generateInput} from "../../../utils/utils";
import Notifications from "react-notify-toast";
import {Row} from "react-materialize";

class LoginForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailHasError: true,
			passwordHasError: true
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validate_email = (email) => {
		this.setState({emailError: '', emailHasError: false});
		this.setState(emailValidation(email.target.value, 'emailError','emailHasError'));
	};

	validate_password = (pass) => {
		const password = pass.target.value;
		this.setState({passwordError: '',  passwordHasError: false });

		if (password.length === 0) {
			this.setState({passwordError: 'Password is required', passwordHasError: true});
		}
	};

	handleSubmit(e) {
		e.preventDefault();
		this.props.userLoginRequest(this.state);
	}


	render() {

		const inputs = [['email', 'email', this.state.email, 'email', 'Email', 'email', this.state.emailError], ['password', 'password', this.state.password, 'password', 'Password', 'vpn_key', this.state.passwordError]
		].map(fld => field(fld));

		return (
			<div>
				<form className={styles['form-login']} onSubmit={this.handleSubmit}>
					<div className={'row'} style={{textAlign: 'center'}}>
						<span className={styles['login-headers']}><b>Login</b></span>
					</div>
					<div className="row">
						<div className={'input-field col s12'}>
							{inputs.map((field, index) => generateInput(field, index, this))}
						</div>
						<div className="input-field col s12">
							<button disabled={this.state.emailHasError || this.state.passwordHasError} className={`btn ${styles['button-effects']}`}
							        type="submit" name="action">Login
							</button>
						</div>
						<div className="input-field col s12">
							<a href="#" className="password-reset-link">Forgot Password?</a>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default LoginForm;

