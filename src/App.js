import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Navigation from './views/Navigation';


const App = () => {
    return (
        <Router>
            <div>
            <Navigation />
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/login' component={Login} />
            </Switch>
            </div>
        </Router>);
};

export default App;