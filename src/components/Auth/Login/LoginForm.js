import React, {Component} from 'react';
import styles from './css/login.scss';
import {Link} from 'react-router-dom';
import {emailValidation, validateEmail} from '../../Utils/utils';
import SocialButtons from '../../social-login/SocialButtons';

class LoginForm extends Component {

	field = (obj) => ({
			type: obj[0],
			name: obj[1],
			value: obj[2],
			htmlFor: obj[3],
			label: obj[4],
			icon: obj[5],
			error: obj[6]
		});
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailHasError: true,
			passwordHasError: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
		e.target.name === 'email'
			? validateEmail(e.target.value, this)
			: this.validatePassword(e.target.value);
	}

	validatePassword = (password) => {
		this.setState({passwordError: '',  passwordHasError: false});

		if (password.length === 0) {
			this.setState({passwordError: 'Password is required', passwordHasError: true});
		} else if (password.length < 8) {
			this.setState({passwordError: 'Weak password, must be at least 8 characters', passwordHasError: true});
		} else if (password.search(/[a-zA-Z]/) === -1) {
			this.setState({passwordError: 'Weak password, must be alphanumeric', passwordHasError: true});
		}
	};

	handleSubmit(e) {
		e.preventDefault();
		this.props.userLoginRequest(this.state);
	}

	generateInput = (field, index) => {
		return (
			<div className={`input-field col s12 ${field.error ? styles.fieldError : ''}`} key={field.name + index}>
				<i className={`material-icons prefix ${field.error ? styles.prefix : ''} ${field.error ? styles.active : ''}`}>{field.icon}</i>
				<input
					className="validate"
					type={field.type}
					name={field.name}
					value={this.state[field.value]}
					onChange={this.handleChange}
					ref={field.htmlFor}
				/>
				<label htmlFor={field.htmlFor}>{field.label}</label>
				<div className={styles['errors']}>{field.error}</div>
			</div>
		);
	};

	loginForm = (inputs) => {
		return <form className={styles['form-login']} onSubmit={this.handleSubmit}>
			<div className={'row'} style={{textAlign: 'center'}}>
				<span className={styles['login-headers']}><b>Login</b></span>
			</div>
			<div className="row">
				<div className={'input-field col s12'}>
					{inputs.map((field, index) => this.generateInput(field, index))}
				</div>
				<div className="input-field col s12">
					<button disabled={this.state.emailHasError || this.state.passwordHasError}
							className={`btn ${styles['button-effects']}`}
							type="submit" name="action">Login
					</button>
				</div>
				<div className="input-field col s12">
					<Link to={'/invoke/password-reset'} onClick={() => {
						$('#loginModal').modal('close')
					}}>Forgot password?</Link>

					<SocialButtons/>
				</div>
			</div>
		</form>
	};

	render() {
		const inputs = [['email', 'email', this.state.email, 'email', 'Email', 'email', this.state.emailError], ['password', 'password', this.state.password, 'password', 'Password', 'vpn_key', this.state.passwordError]
		].map(fld => this.field(fld));
		return (
			<div>
				{this.loginForm(inputs)}
			</div>
		);
	}
}

export default LoginForm;

