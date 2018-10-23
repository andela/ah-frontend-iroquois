import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Logo } from '../logo/Logo';
import styles from '../../styles/navigation/NavBar.scss';
import DropDown from './GenerateDropdownItems';
import {userLoginRequest} from '../../redux-js/actions/LoginAction';
import LoginForm from '../Auth/Login/LoginForm';
import SignUpForm from "../signup/subcomponents/SignUpForm";
import style from '../../styles/signup.scss';
import {userSignUpRequest} from "../../redux-js/actions/signUpActions";
import {field, generateModal, modalfields} from "../../utils/utils";
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

class LoggedInNav extends React.Component {


	render() {
		return (
			<ul className='right'>
				<DropDown />
				<li className={loggedInNavClassNames}>
					<Link to="/">
						<i className="material-icons">more_vert</i>
					</Link>
				</li>
			</ul>
		);
	}
}


const NotLoggedInNav = (props) => {

    const attrs = [
        ['','','','','','','','signupModal','signupModal',style["modal-effects"],
			styles.signup,'Signup', props,SignUpForm],
        ['','','','','','','','loginModal', 'loginModal', styles["Modal"],
			 styles.login, 'Login', props,LoginForm]
    ].map(fld => field(fld));
    return (
    	<div className="right" style={{marginRight: '3em', display: 'flex'}}>
			{attrs.map(attrs => generateModal(attrs))}
    	</div>

	)};

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

export default withRouter(connect(mapStateToProps,{userSignUpRequest,userLoginRequest})(NavBar));
