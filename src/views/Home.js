import React from 'react';
import Login from './Login';
import PageLoader from '../components/PageLoader/PageLoader';
import requestLoadingAction from '../redux-js/actions/request-loading';

const Home = () => {
	window.store.dispatch(requestLoadingAction(true));

	return (
		<div>
			<PageLoader/>
			<h3>Welcome to Authors Haven!</h3>
			<Login/>
		</div>
	);
};

export default Home;
