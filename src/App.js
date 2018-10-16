import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/navigation/NavBar';
import PageLoader from './components/PageLoader/PageLoader';
import InvokePasswordResetEmail from './components/Password/InvokePasswordResetEmail';
import ResetPassword from './components/Password/ResetPassword';
import Notification from 'react-notify-toast';


const App = () => {
	return (
		<Router>
			<div>
				<NavBar />
				<PageLoader/>
				<Notification />
				<Switch>
					<Route path='/' component={LandingPage} exact/>
					<Route path='/invoke/password-reset' component={InvokePasswordResetEmail} exact/>
					<Route path='/reset/password' component={ResetPassword} exact/>
				</Switch>
			</div>
		</Router>);
};

export default App;
