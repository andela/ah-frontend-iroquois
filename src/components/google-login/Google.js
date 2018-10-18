import * as PropTypes from 'prop-types';
import * as React from 'react';
import GoogleLogin from 'react-google-login';
import styles from './Google.scss';

export default class Google extends React.Component {

	providers = {
		GOOGLE: 'google'
	};

	google = {'client_id': process.env.GOOGLE_API_KEY};

	loginWithGoogle = response => this.props.onSocialSuccess(response, this.providers.GOOGLE);

	render() {
		return (
			<GoogleLogin
				className={`${styles['material-button-raised']} ${styles.google}`}
				buttonText=" Google"
				prompt="consent"
				redirectUri="/"
				autoLoad={false}
				responseType="id_token"
				clientId={this.google.client_id}
				onFailure={this.props.googleOnFailure}
				onSuccess={this.loginWithGoogle}
			>
				{this.props.iconDiv}
			</GoogleLogin>
		);
	}
}

Google.propTypes = {
	googleOnFailure: PropTypes.func.isRequired,
	onSocialSuccess: PropTypes.func.isRequired
};
