import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Notification from 'react-notify-toast';
import ResetPassword from './components/Auth/resetPassword/resetPassword';
import InvokePasswordResetEmail from './components/Auth/resetPassword/invokePasswordResetEmail';
import Logout from './components/Logout/logout';
import LandingPage from './components/landingPage/landingPage';
import NavBar from './components/navigation/navBar';
import PageLoader from './components/pageLoader/pageLoader';

const App = () => (
	<Router>
		<div>
			<NavBar />
			<PageLoader />
			<Notification />
			<Switch>
				<Route path='/' component={LandingPage} exact />
				<Route path='/logout' component={Logout} />
				<Route path='/invoke/password-reset' component={InvokePasswordResetEmail} exact />
				<Route path='/reset/password' component={ResetPassword} exact />
				<Route path='*' component={LandingPage} />
			</Switch>
		</div>
	</Router>);

export default App;
