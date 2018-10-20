import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
		this.props.userLoginRequest({email: this.refs.email.value, password: this.refs.password.value});

	}

	loginForm = (inputs) => {
		return <form className={styles['form-login']} onSubmit={this.handleSubmit}>
			<div className={'row'} style={{textAlign: 'center'}}>
				<span className={styles['login-headers']}><b>Login</b></span>
			</div>
			<div className="row">
				<div className={'input-field col s12'}>
					{inputs.map((field, index) => generateInput(field, index,this))}
				</div>
			</div>
			<div className='row'>
				<div className="input-field col s12 m12 l12 center-align">
					<button style={{width: '50%', textTransform: 'none'}} disabled={this.state.emailHasError || this.state.passwordHasError}
							className={`btn ${styles['button-effects']}`} type="submit" name="action">Login
					</button>
				</div>
			</div>
			<div className='row'>
				<div className="input-field col s12 m12 l12 center-align">
					<Link style={{height: '16px', fontSize: '9pt', lineHeight: '16px', display: 'inline-block', float: 'none'}}
						  to={'/invoke/password-reset'} onClick={() => {$('#loginModal').modal('close')}}>Forgot password?</Link>
				</div>
			</div>
			<SocialButtons />
		</form>
	};

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

export default LoginForm;
