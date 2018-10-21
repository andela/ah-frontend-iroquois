import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Authenticate } from '../ProtectedRoute/PrivateRoute';

class Logout extends React.Component {

	componentWillMount() {
		Authenticate.logout(this.props.dispatch);
	}

	render() {
		return <Redirect to='/' />;
	}
}

Logout.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default withRouter(connect()(Logout));
