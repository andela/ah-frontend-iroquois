import React from 'react';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from '../../styles/profile/profile.scss';

const nameFields = (name, text, value, handleChange) => (
	<input
		autoComplete={name} //searches for previously input text versions
		id={name}
		type="text"
		name={name}
		className="validate"
		placeholder={text}
		value={value || ''}
		onChange={handleChange}
	/>
);

const lableFields = (name, text) => (
	<label htmlFor={name} className="active">{text}</label>
);

const usernameField = (name, text, value, handleChange) => (
	<div className="row">
		<div className="input-field col s12">
			<i className="material-icons prefix">account_circle</i>
			{nameFields(name, text, value, handleChange)}
			{lableFields(name, text)}
		</div>
	</div>
);

const formFields = (firstName, lastName, userName, bio, isDisabled, handleChange) => (
	<div>
		<div className="row">
			<div className="input-field col s6">
				<i className="material-icons prefix">account_circle</i>
				{nameFields('firstName', 'First Name', firstName, handleChange)}
				{lableFields('firstName', 'First Name')}
			</div>
			<div className="input-field col s6">
				{nameFields('lastName', 'Last Name', lastName, handleChange)}
				{lableFields('lastName', 'Last Name')}
			</div>
		</div>
		{usernameField('userName', 'Username', userName, handleChange)}
		<div className="row">
			<div className="input-field col s12">
				<i className="material-icons prefix">mode_edit</i>
				<textarea maxLength="120" placeholder='bio' value={bio || ''} id="bio" className="materialize-textarea" data-length="120" name='bio' onChange={handleChange} />
				<label htmlFor="bio" className='active'>Bio</label>
			</div>
		</div>
		<div className="row">
			<div className="col s4 offset-s1 m3 offset-m2">
				<button type='submit' disabled={isDisabled} className="btn btn-small teal darken-3 modal-trigger">Update</button>
			</div>
			<div className='col s5 offset-s2 m5 offset-m2'>
				<Link to='/profile' className="btn btn-small white black-text">Cancel</Link>
			</div>
		</div>
	</div>
);

const ProfileForm = (props) => {
	const data = props.profile;
	return (
		<div className={`row ${styles.profile_container}`}>
			<div className="col s12 m8 offset-m2 l4 offset-l4">
				<div className="card ">
					<div className="card-content">
						<form onSubmit={props.handleSubmit}>
							<div className="row">
								<div className="col s8 offset-s2 grey-text l10 offset-l2 center-text"><h5>Personal information</h5></div>
							</div>
							{formFields(data.firstName, data.lastName, data.userName, data.bio, data.isDisabled, props.handleChange, usernameField)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	profile: PropTypes.shape({
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		userName: PropTypes.string,
		bio: PropTypes.string
	}).isRequired
};

export default ProfileForm;

