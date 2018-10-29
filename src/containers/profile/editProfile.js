import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ProfileForm from '../../components/profile/profileForm';
import { fetchProfile, updateProfile } from '../../actions/profileActions/profileActions';

export class EditProfile extends React.Component {
	state = {
		userName: '',
		firstName: '',
		lastName: '',
		bio: '',
		isDisabled: false
	};

	componentWillMount() {
		this.props.dispatch(fetchProfile(this.props));
		this.setState({
			...this.props.data.profileInfo
		});
	};

	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.data.profileInfo !== nextProps.data.profileInfo) {
			this.setState({
				...nextProps.data.profileInfo
			});
		}
	}

	handleChange = evt => {

		let inputValue = evt.target.value;
		if (evt.target.name !== 'bio') {
			const regex = /[^a-z0-9]/gi;
			inputValue = evt.target.value.replace(regex, '');
		}
		if (evt.target.name === 'userName') {
			this.setState({isDisabled: evt.target.value === ''});
		}

		this.setState({[evt.target.name]: inputValue});

	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(updateProfile({...this.state}, this.props));
	};

	render() {
		return (
			<ProfileForm
				profile={this.state}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}

}

EditProfile.propTypes = {
	data: PropTypes.shape({
		profileInfo: PropTypes.object
	}).isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({data: state});

export default connect(mapStateToProps)(EditProfile);
