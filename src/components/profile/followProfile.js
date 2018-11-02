import React from 'react';
import styles from '../../styles/profile/profile.scss';
import {FollowingList, FollowersList} from './followingList';

const FollowProfile = (props) => (
	<div>
		<div className='row'>
			<div className={`col s12 ${styles['nav-tab']}`}>
				<ul className='tabs'>
					<li className='tab col s6'><a href='#following' className='active black-text'>Following</a></li>
					<li className='tab col s6'><a className='black-text' href='#followers'>Followers</a></li>
				</ul>
			</div>
			<div id='following' className={`col s12 ${styles.display}`}>
				<FollowingList {...props} handleChange={props.handleChange} />
			</div>
			<div id='followers' className={`col s12 ${styles.display}`}>
				<FollowersList {...props} handleChange={props.handleChange} />
			</div>
		</div>
	</div>
);
export default FollowProfile;
