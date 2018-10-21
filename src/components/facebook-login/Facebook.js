import * as PropTypes from 'prop-types';
import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import styles from './Facebook.scss';

export default class Facebook extends React.Component {
	providers = {
		FACEBOOK: 'facebook'
	};

	facebook = { app_id: process.env.FACEBOOK_API_KEY };

	loginWithFacebook = response =>
		this.props.onSocialSuccess(response, this.providers.FACEBOOK);

	render() {
		return (
			<FacebookLogin
				appId={this.facebook.app_id}
				autoLoad={false}
				size="medium"
				fields="name,email,picture"
				callback={this.loginWithFacebook}
				cssClass={`btn ${styles['material-button-raised']} ${styles.facebook}`}
				textButton=""
				icon={this.props.iconDiv}
			/>
		);
	}
}

Facebook.propTypes = {
	onSocialSuccess: PropTypes.func.isRequired,
	iconDiv: PropTypes.any
};
