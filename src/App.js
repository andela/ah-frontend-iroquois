import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import NavBar from './components/navigation/NavBar';

const App = () => {
	return (
		<Router>
			<div>
				<NavBar />
				<Switch>
					<Route path='/' component={Home} exact/>
					<Route path='/login' component={Login}/>
				</Switch>
			</div>
		</Router>);
};

export default App;
