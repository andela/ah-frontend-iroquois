import React from 'react';
import * as PropTypes from 'prop-types';
import { formatDate } from '../../utils/index';

// noinspection JSUnresolvedVariable
const ViewArticleHeader = props => {
	const { description, created_at, title } = props.article;
	return (
		<div>
			<div className='row' style={{display: 'flex', alignItems: 'flex-end'}}>
				<div className='col s12 m9 l9'>
					<h2>{title}</h2>
				</div>
				<div className="col s12 m3 l3 right-align">
					<span style={{color: 'crimson'}}>
						{formatDate(created_at)}
					</span>
				</div>
			</div>

			<div className='row'>
				<div className='col s12 m12 l12'>
					<h5>{description}</h5>
				</div>
			</div>
		</div>
	);

};

ViewArticleHeader.propTypes = {
	article: PropTypes.object.isRequired
};

export default ViewArticleHeader;
