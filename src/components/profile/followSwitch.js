import React from 'react';
import {USERNAME_KEY} from '../../constants';

const FollowSwitch = (props) => {
	const followers = props.profile.followers || [];
	const isFollowing = followers.includes(localStorage.getItem(USERNAME_KEY));
	return (
		<div className="switch">
			<label>
				{'Unfollow'}
				<input type="checkbox" checked={isFollowing} onChange={props.handleChange} />
				<span className="lever" />
				{'Follow'}
			</label>
		</div>
	);
};
export default FollowSwitch;
