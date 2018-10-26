import React from 'react';
import { connect } from 'react-redux';
import ProfileInformation from '../../components/profile/profileInformation';
import { fetchProfile } from '../../actions/profileActions/profileActions';

class Profile extends React.Component {

	componentWillMount() {
		this.props.dispatch(fetchProfile(this.props));
	};

	render() {
		return (
			<ProfileInformation {...this.props.data.profileInfo} />
		);
	}
}

const mapStateToProps = (state) => ({data: state});

export default connect(mapStateToProps)(Profile);
