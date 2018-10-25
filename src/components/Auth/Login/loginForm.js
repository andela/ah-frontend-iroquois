/* eslint-disable react/no-string-refs */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as PropTypes from 'prop-types';
import styles from '../../../styles/authStyles/login.scss';
import {emailValidation, field, generateInput} from '../../../utils';
import SocialButtons from './socialLogin/socialButtons';

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
	};

	validateForemail = (email) => {
		this.setState({emailError: '', emailHasError: false});
		this.setState(emailValidation(email.target.value, 'emailError', 'emailHasError'));
	};

	validateForpassword = (pass) => {
		const password = pass.target.value;
		this.setState({passwordError: '', passwordHasError: false });

		if (password.length === 0) {
			this.setState({passwordError: 'Password is required', passwordHasError: true});
		}
	};

	loginForm = (inputs) => (
		<form className={styles['form-login']} onSubmit={this.handleSubmit}>
			<div className="row" style={{textAlign: 'center'}}>
				<span className={styles['login-headers']}><b>Login</b></span>
			</div>
			<div className="row">
				<div className="input-field col s12">
					{inputs.map((inputField, index) => generateInput(inputField, index, this))}
				</div>
			</div>
			<div className='row'>
				<div className="input-field col s12 m12 l12 center-align">
					<button
						style={{width: '50%', textTransform: 'none'}}
						disabled={this.state.emailHasError || this.state.passwordHasError}
						className={`btn ${styles['button-effects']}`}
						type="submit"
						name="action"
					>
						<span>Login</span>
					</button>
				</div>
			</div>
			<div className='row'>
				<div className="input-field col s12 m12 l12 center-align">
					<Link
						style={{height: '16px', fontSize: '9pt', lineHeight: '16px', display: 'inline-block', float: 'none'}}
						to="/invoke/password-reset"
						// eslint-disable-next-line no-undef
						onClick={() => { $('#loginModal').modal('close'); }}
					>
						<span>Forgot password?</span>
					</Link>
				</div>
			</div>
			<SocialButtons />
		</form>
	);

	handleSubmit(e) {
		e.preventDefault();
		this.props.userLoginRequest({email: this.refs.email.value, password: this.refs.password.value});

	}

	render() {

		const inputs = [['email', 'email', this.state.email, 'email', 'Email', 'email', this.state.emailError], ['password', 'password', this.state.password, 'password', 'Password', 'vpn_key', this.state.passwordError]
		].map(fld => field(fld));

		return (
			<div>
				{this.loginForm(inputs)}
			</div>
		);
	}
}
LoginForm.propTypes = {
	userLoginRequest: PropTypes.func.isRequired
};

export default LoginForm;
