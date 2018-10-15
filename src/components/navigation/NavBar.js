import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Logo } from '../logo/Logo';
import styles from '../../styles/navigation/NavBar.scss';
import DropDown from './GenerateDropdownItems';

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

const NotLoggedInNav = () => (
	<div className="right" style={{marginRight: '3em'}}>
		<a href='#' className={styles.signup}>Signup</a>
		<a href='#' className={styles.login}>Login</a>
	</div>
);

const NavBar = (props) => (
	<div className={navWrapperClassNames}>
		<nav className={navClassNames}>
			<div className="nav-wrapper">

				<LogoContainer />

				{
					props.isLoggedIn
						? <LoggedInNav />
						: <NotLoggedInNav />
				}

			</div>
		</nav>
	</div>

);

NavBar.propTypes = {
	isLoggedIn: PropTypes.bool
};

NavBar.defaultProps = {
	isLoggedIn: false
};

const mapStateToProps = state => ({...state});

export default withRouter(connect(mapStateToProps)(NavBar));
