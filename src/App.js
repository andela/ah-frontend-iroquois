import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Notification from 'react-notify-toast';
import ResetPassword from './components/Auth/resetPassword/resetPassword';
import InvokePasswordResetEmail from './components/Auth/resetPassword/invokePasswordResetEmail';
import Logout from './components/Logout/logout';
import LandingPage from './components/landingPage/landingPage';
import NavBar from './components/navigation/navBar';
import PageLoader from './components/pageLoader/pageLoader';
import { PrivateRoute } from './components/ProtectedRoute/privateRoute';
import ViewAll from './containers/viewAllArticles';
import ViewArticle from './containers/viewArticle';
import CreateArticle from './containers/createArticle';
import Profile from './containers/profile/profile';
import EditProfile from './containers/profile/editProfile';

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
				<PrivateRoute path='/profile' component={Profile} exact />
				<PrivateRoute path='/profile/edit' component={EditProfile} exact />
				<PrivateRoute path='/new-articles' component={CreateArticle} />
				<PrivateRoute path='/articles' component={ViewAll} exact />
				<PrivateRoute path='/articles/:slug' component={ViewArticle} exact />
				<Route path='*' component={LandingPage} />
			</Switch>
		</div>
	</Router>);

export default App;
