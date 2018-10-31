import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import ProfileInformation from '../../components/profile/profileInformation';
import { fetchProfile } from '../../actions/profileActions/profileActions';
import {followProfile} from '../../actions/profileActions/followActions';

class Profile extends React.Component {

	componentWillMount() {
		this.username = this.props.match.params.username || null;
		this.props.dispatch(fetchProfile(this.props, this.username));
	}

	componentWillReceiveProps(nextProps, context) {
		const username = nextProps.match.params.username || null;
		if (this.username !== username) {
			this.username = username;
			this.props.dispatch(fetchProfile(this.props, this.username));
		}
	}

	handleChange = (evt, username = null) => {
		this.setState({following: evt.target.checked}, () => {
			this.props.dispatch(followProfile({userName: this.username || username, shouldFollow: this.state.following}));
		});
	};

	render() {
		return (
			<ProfileInformation handleChange={this.handleChange} {...this.props.data.profileInfo} />
		);
	}
}

const mapStateToProps = (state) => ({data: state});

export { Profile as ProfileTest};

export default withRouter(connect(mapStateToProps)(Profile));
