/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ResetPasswordThunk } from '../../../actions/authActions/resetPasswordAction';
import SubmitContent from './common';
import { handleChanging } from '../../../utils/index';

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newPassword: '',
			confirmPassword: '',
			newPasswordError: '',
			newHasError: true,
			confirmHasError: true,
			confirmPasswordError: ''

		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (evt) => {
		handleChanging(evt, this.validatePassword, this.validateConfirmPassword, this);
	};

	validatePassword = (newPassword) => {
		this.setState({ newPasswordError: '', newHasError: false });

		if (newPassword.length === 0) {
			this.setState({ newPasswordError: 'Password is required', newHasError: true });
		} else if (newPassword.length < 8 || newPassword.search(/[a-zA-Z]/) === -1) {
			this.setState({
				newPasswordError: 'Password should be alphanumeric with at least 8 characters',
				newHasError: true
			});
		}

	};

	validateConfirmPassword = (confirmPassword) => {
		this.setState({ confirmPasswordError: '', confirmHasError: false });

		if (confirmPassword.length === 0) {
			this.setState({ confirmPasswordError: 'You need to confirm your password', confirmHasError: true });
		} else if (confirmPassword !== this.state.newPassword) {
			this.setState({ confirmPasswordError: 'Passwords don\'t match', confirmHasError: true });
		}

	};

	handleSubmit = (event) => {
		event.preventDefault();

		const myToken = window.location.href;
		const Token = myToken.toString().substring(myToken.lastIndexOf('?') + 1);
		const { confirmPassword, newPassword } = this.state;
		this.props.dispatch(ResetPasswordThunk(newPassword, confirmPassword, Token));

	};

	passResetForm = field => (
		<div key={field.name} className="row">
			<div className="input-field col s12 m12">
				<i className="material-icons prefix">vpn_key</i>
				<input
					autoComplete={field.name} //searches for previously input text versions
					id={field.name}
					type="password"
					name={field.name}
					className="validate"
					onChange={this.handleChange}
				/>
				<label htmlFor={field.name}>{field.text}</label>
				<span className="red-text">{field.error}</span>
			</div>
		</div>
	);

	generateCard = (fields) => (
		<div className="row">
			<div className="row">
				<div className="col m10 offset-m1">
					<span className="card-title teal-text"><h5>Reset Password</h5></span>
					<p className="grey-text">
						{`Create new password. It should be a strong password with at least 8 characters long
						with mixed letters and numbers`}
					</p>
				</div>
			</div>
			<div className="col s12 m10 offset-m1">
				<form onSubmit={this.handleSubmit}>

					{fields.map(field => this.passResetForm(field))}

					{SubmitContent(this.state.newHasError, this.state.confirmHasError)}
				</form>
			</div>
		</div>
	);

	render() {
		const fields = [
			{ name: 'newPassword', text: 'Password', error: this.state.newPasswordError },
			{ name: 'confirmPassword', text: 'Confirm Password', error: this.state.confirmPasswordError }
		];

		return (
			<div className="row">
				<div className="col s12 m6 offset-m3 l4 offset-l4">
					<div className="card white">
						<div className="card-content black-text">
							{this.generateCard(fields)}
						</div>
					</div>
				</div>
			</div>
		);

	}
}

const mapStateToProps = state => ({
	data: state
});

ResetPassword.propTypes = {
	dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(ResetPassword);
