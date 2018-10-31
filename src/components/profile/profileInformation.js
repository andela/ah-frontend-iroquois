/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import styles from '../../styles/profile/profile.scss';
import {USERNAME_KEY} from '../../constants';
import FollowSwitch from './followSwitch';
import FollowProfile from './followProfile';

const ProfileInformation = (props) =>

	 (
		<div className={`profileData row ${styles.profile_container}`}>
			<div className='col s12 m10 offset-m1 l8 offset-l2'>
				<div className={`row ${styles.profile_content}`}>
					<div className='col s6 offset-s3 m3 l2 xl1'>
						<img
							src={props.avatar ? props.avatar :
								'http://www.macmillanenglish.com/img/author-image.png'}
							className='responsive-img circle'
							alt='user profile'
						/>
					</div>
					<div className='col s12 m6 offset-m1 l4 xl11'>
						<h5 className={`black-text lighten-3 ${styles.usernames}`}>
							{props.firstName}&nbsp;{props.lastName}
						</h5>
						<h6 className='grey-text'>{`@${props.userName}`}</h6>
						<p>{props.bio}</p>
						{
							props.userName === localStorage.getItem(USERNAME_KEY)
								? <div><Link className={`btn btn-small white-text teal darken-3 ${styles.edit_profile}`} to='/profile/edit'>Update Profile</Link></div>
								: <div><FollowSwitch handleChange={props.handleChange} profile={props} /></div>
						}
					</div>
					<div><FollowProfile {...props} /></div>
				</div>
			</div>
		</div>
	);

ProfileInformation.propTypes = {
	userName: PropTypes.string.isRequired,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	bio: PropTypes.string,
	avatar: PropTypes.string
};

export default ProfileInformation;
