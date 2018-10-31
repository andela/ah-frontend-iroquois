import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {formatName} from '../../utils';
import styles from '../../styles/profile/profile.scss';

const CardData = ({user, data}) => (
	<div className="col s4 m4" key={user}>
		<div className="card horizontal">
			<div className="card-stacked">
				<div className="card-content">
					<span>
						<img className={styles.img} alt='img' src={data.avatar || 'http://www.macmillanenglish.com/img/author-image.png'} />
					</span>
					<span className={styles.username}>{formatName(user)}</span>
				</div>
			</div>
		</div>
	</div>
);

CardData.propTypes = {
	user: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
};

const RenderCard = props => {
	const { data = [] } = props;
	return (
		<div>
			{data.length === 0
				? <div className={styles.userDisplay}>No users to display</div>
				: (data.map(user => (
					<Link key={user} to={`/profile/${user}`}>
						<CardData user={user} data={data} />
					</Link>
				)))}
		</div>
	);
};

RenderCard.propTypes = {
	data: PropTypes.array.isRequired
};

export const FollowingList = (props) => {
	const followingList = props.following;
	return <RenderCard data={followingList} />;
};

FollowingList.propTypes = {
	following: PropTypes.array.isRequired
};

export const FollowersList = (props) => {
	const { followers = [] } = props;
	return <RenderCard data={followers} />;
};

FollowersList.propTypes = {
	followers: PropTypes.array.isRequired
};
