import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import styles from '../../styles/navBar.scss';
import DropDown from './generateDropdownItems';
import userLoginRequest from '../../actions/authActions/loginAction';
import style from '../../styles/authStyles/signup.scss';
import {field, generateModal} from '../../utils/index';
import LoginForm from '../Auth/Login/loginForm';
import SignUpForm from '../Auth/signup/signUpForm';
import Logo from '../logo/logo';
import userSignUpRequest from '../../actions/authActions/signUpActions';

const authorsHavenClassNames = classNames(styles.title, 'right', 'hide-on-small-and-down');
const loggedInNavClassNames = classNames('hide-on-med-and-up', styles.dropdown);
const navWrapperClassNames = classNames('navbar-fixed', styles['navbar-fixed']);
const navClassNames = classNames('navbar-fixed', styles.white, styles.navigation);
const logoWrapper = classNames('left', styles.logo);
const linkClassnames = classNames('brand-logo', 'left');

const LogoContainer = () => (
	<Link to='/' className={linkClassnames}>
		<div className={logoWrapper}>
			<Logo />
		</div>
		<div className={authorsHavenClassNames}>Authors Haven</div>
	</Link>
);

const LoggedInNav = () => (
	<ul className='right'>
		<DropDown />
		<li className={loggedInNavClassNames}>
			<Link to="/">
				<i className="material-icons">more_vert</i>
			</Link>
		</li>
	</ul>
);

const NotLoggedInNav = (props) => {

	const attrs = [
		['', '', '', '', '', '', '', 'signupModal', 'signupModal', style['modal-effects'],
			styles.signup, 'Signup', props, SignUpForm],
		['', '', '', '', '', '', '', 'loginModal', 'loginModal', styles.Modal,
			 styles.login, 'Login', props, LoginForm]
	].map(fld => field(fld));
	return (
		<div className="right" style={{marginRight: '3em', display: 'flex'}}>
			{attrs.map(attr => generateModal(attr))}
		</div>

	);
};

const NavBar = (props) => (
	<div className={navWrapperClassNames}>
		<nav className={navClassNames}>
			<div className="nav-wrapper">

				<LogoContainer />

				{
					props.isLoggedIn
						? <LoggedInNav />
						: <NotLoggedInNav {...props} />
				}

			</div>
		</nav>
	</div>

);

NavBar.propTypes = {
	isLoggedIn: PropTypes.bool,
	userLoginRequest: PropTypes.func.isRequired,
	userSignUpRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({...state, visible: state.users.visible, isLoggedIn: state.user.loggedIn});

NavBar.defaultProps = {
	isLoggedIn: false,
	visible: true
};

export default withRouter(connect(mapStateToProps, {userSignUpRequest, userLoginRequest})(NavBar));
