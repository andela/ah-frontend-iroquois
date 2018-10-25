/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import SubmitContent from './common';
import {validateEmail} from '../../../utils';
import {PasswordInvokeThunk} from '../../../actions/authActions/resetPasswordAction';

class InvokePasswordResetEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailHasError: true,
			emailError: '',
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

handleSubmit = (event) => {
	event.preventDefault();
	this.props.dispatch(PasswordInvokeThunk(this.state.email));
};

emailForm = () => (
	<form onSubmit={this.handleSubmit}>
		<div className="row">
			<div className="input-field col s12 m12">
				<i className="material-icons prefix">email</i>
				<input id="email" type="email" className="validate" name="email" onChange={this.handleChange} />
				<label htmlFor="email">Email</label>
				<span className="red-text">{this.state.emailError}</span>
			</div>
		</div>
		{SubmitContent(false, this.state.emailHasError)}
	</form>
);

handleChange(evt) {
	this.setState({[evt.target.name]: evt.target.value});
	if (evt.target.name === 'email') {
		validateEmail(evt.target.value, this);
	}
}

render() {
	return (
		<div className="row">
			<div className="col s12 m6 offset-m3 l4 offset-l4">
				<div className="card white">
					<div className="card-content black-text">
						<div className="row">
							<div className="col m10 offset-m1">
								<span className="card-title teal-text"><h5>Get password reset link</h5></span>
								<p className="grey-text">
									{'Forgotten your password? Enter your email address below, and we’ll send instructions for setting a new one.'}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col s12 m10 offset-m1">
								{this.emailForm()}
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
}

const mapStateToProps = state => ({data: state });

InvokePasswordResetEmail.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(InvokePasswordResetEmail);
