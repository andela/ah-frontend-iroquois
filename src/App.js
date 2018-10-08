import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './views/Home';
import NavBar from './components/navigation/NavBar';
import PageLoader from './components/PageLoader/PageLoader';
import Login from './views/Login';

const App = () => {
	return (
		<Router>
			<div>
				<NavBar/>
				<PageLoader/>
			<Switch>
				<Route path='/' component={Home} exact/>
				<Route path='/login' component={Login}/>
			</Switch>
				</div>
		</Router>

	);
};

export default App;
