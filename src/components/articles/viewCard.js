import { Link } from 'react-router-dom';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';
import {formatDate, formatName, image} from '../../utils';

export const IMG = 'https://avatars0.githubusercontent.com/u/4?v=4';

const ViewCard = props => (
	<div className={`card black-text ${styles.card}`}>
		<div className="card-content" style={{padding: '12px'}}>
			<div className='row' style={{display: 'flex', marginBottom: '0'}}>

				{ image({height: 100, width: 100, article: props.article, className: 'col s12 m3 l3 center-align'}) }

				<div className='col s12 m9 l9 left-align'>
					<h4 className={`card-title ${styles['card-title']}`}>{props.article.title}</h4>
					<span className={`${styles.note} right-align`} />
					<div className='row'>
						<div className='col s6 m6 l6'>
							<span style={{color: '#F18F01'}}>{formatName(props.article.author.username)}</span>
						</div>
						<div className='col s6 m6 l6' style={{textAlign: 'right'}}>
							<span style={{color: 'crimson'}}>
								{formatDate(props.article.created_at)}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col sm12 m2 l2' />
				<div className='col sm12 m10 l10'>
					<p>{props.article.description}</p>
					<Link style={{float: 'right', color: '#005990'}} to={{pathname: `/articles/${props.article.slug}`, state: {article: props.article}}}>Read More</Link>
				</div>
			</div>
		</div>
	</div>
);

ViewCard.propTypes = {
	article: PropTypes.object.isRequired
};

export default ViewCard;
