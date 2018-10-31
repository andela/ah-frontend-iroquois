import { Link } from 'react-router-dom';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';
import {formatDate, formatName, image} from '../../utils';

export const IMG = 'https://avatars0.githubusercontent.com/u/4?v=4';

const main = (author, created_at, title, article) => (

	<div className='row' style={{display: 'flex', marginBottom: '0'}}>
		{ image({height: 100, width: 100, article, className: 'col s12 m3 l3 center-align'}) }
		<div className='col s12 m9 l9 left-align'>
			<h4 className={`card-title ${styles['card-title']}`}>{title}</h4>
			<span className={`${styles.note} right-align`} />
			<div className='row'>
				<div className='col s6 m6 l6'>
					<Link style={{color: '#F18F01'}} to={`/profile/${author.username}`}>{formatName(author.username)}</Link>
				</div>
				<div className='col s6 m6 l6' style={{textAlign: 'right'}}>
					<span style={{color: 'crimson'}}>
						{formatDate(created_at)}
					</span>
				</div>
			</div>
		</div>
	</div>
);

const ViewCard = props => {
	const { article } = props;
	const { author, title, created_at, description, slug } = article;
	return (
		<div className={`card black-text ${styles.card}`}>
			<div className="card-content" style={{padding: '12px'}}>
				{main(author, created_at, title, article)}
				<div className='row'>
					<div className='col sm12 m2 l2' />
					<div className='col sm12 m10 l10'>
						<p>{description}</p>
						<Link style={{float: 'right', color: '#005990'}} to={{pathname: `/articles/${slug}`, state: {article}}}>Read More</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

ViewCard.propTypes = {
	article: PropTypes.object.isRequired
};

export default ViewCard;
