import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import API_URLS from '../../constants';
import styles from './Social.scss';
import {
	getSocialLoginService,
	getUpdateRequestLoading
} from '../../redux-js/actions/social-login-creators';
import Google from '../google-login/Google';
import Facebook from '../facebook-login/Facebook';
import CustomSvgIcon from '../svg-images/GenerateSvg';
import { ICON, ICON_COLOR } from '../svg-images/Icons';

class SocialButtons extends React.Component {
	providers = {
		GOOGLE: 'google',
		FACEBOOK: 'facebook'
	};

	handleSocialSuccess = (token, provider) => {
		const URL = provider === this.providers.GOOGLE
			? API_URLS.GOOGLE_AUTH
			: API_URLS.FACEBOOK_AUTH;

		this.props.socialLoginService(URL, { user: { auth_token: token } }, 'post');

	};

	handleSocialFailure = (errorResponse, provider) => {
		this.props.updateRequestLoading(false);

		notify.show(`An Error occurred when trying to log-in with ${provider}. ${errorResponse}`, 'error', 5000);
	};

	onSocialSuccess = (response, provider) => {
		// noinspection JSUnresolvedVariable
		const token =
			provider === this.providers.FACEBOOK
				? response.accessToken
				: response.tokenId;

		if (!token) {
			this.handleSocialFailure(response.error, provider);
		}

		this.handleSocialSuccess(token, provider);
	};

	googleOnFailure = response => {
		this.handleSocialFailure(response.error, this.providers.GOOGLE);
	};

	generateIconDiv =(button) => (
		<div className={styles['button-icon']}>
			<CustomSvgIcon icon={button.icon} color={button.iconColor} />
			<span>{button.text}</span>
		</div>
	);

	render() {
		const options = {
			GOOGLE: {text: 'Login with Google', icon: ICON.GOOGLE, iconColor: ICON_COLOR.WHITE},
			FACEBOOK: {text: 'Login with Facebook', icon: ICON.FACEBOOK, iconColor: ICON_COLOR.WHITE}
		};

		return (
			<div className={styles['social-container']}>

				<div className={styles['buttons-social']}>
					<Google
						googleOnFailure={this.googleOnFailure}
						onSocialSuccess={this.onSocialSuccess}
						iconDiv={this.generateIconDiv(options.GOOGLE)}
					/>

					<Facebook iconDiv={this.generateIconDiv(options.FACEBOOK)} onSocialSuccess={this.onSocialSuccess} />
				</div>
			</div>
		);
	}
}

SocialButtons.propTypes = {
	updateRequestLoading: PropTypes.func.isRequired,
	socialLoginService: PropTypes.func.isRequired
};

const mapStateToProps = state => ({state: state.socialLoginReducer});

const mapDispatchToProps = dispatch => ({
	socialLoginService: getSocialLoginService(dispatch),
	updateRequestLoading: getUpdateRequestLoading(dispatch)
});

export { SocialButtons as SocialRenderTest };

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SocialButtons)
);
