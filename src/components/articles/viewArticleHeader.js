import React from 'react';
import * as PropTypes from 'prop-types';
import { formatDate } from '../../utils/index';

// noinspection JSUnresolvedVariable
const ViewArticleHeader = props => (
	<div>
		<div className='row' style={{display: 'flex', alignItems: 'flex-end'}}>
			<div className='col s12 m9 l9'>
				<h2>{props.article.title}</h2>
			</div>
			<div className="col s12 m3 l3 right-align">
				<span style={{color: 'crimson'}}>
					{formatDate(props.article.created_at)}
				</span>
			</div>
		</div>

		<div className='row'>
			<div className='col s12 m12 l12'>
				<h5>{props.article.description}</h5>
			</div>
		</div>
	</div>
);

ViewArticleHeader.propTypes = {
	article: PropTypes.object.isRequired
};

export default ViewArticleHeader;
