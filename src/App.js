import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/navigation/NavBar';

const App = () => {
	return (
		<Router>
			<div>
				<NavBar />
				<Switch>
					<Route path='/' component={LandingPage} exact/>
				</Switch>
			</div>
		</Router>);
};

export default App;
