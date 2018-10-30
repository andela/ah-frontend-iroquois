import React from 'react';
import * as PropTypes from 'prop-types';
import {formatName, image} from '../../utils/index';

const ViewArticleSides = props => {
	const { article } = props;

	return (
		<div>
			<div className="row">

				{ image({height: 150, width: 150, article, className: 'col s12 m12 l12 center-align'}) }

			</div>
			<div className='row'>
				<div className="col s12 m12 l12">
					<span className="black-text center-align">
						<h4>{formatName(article.author.username)}</h4>
					</span>
				</div>
			</div>
		</div>
	);
};

ViewArticleSides.propTypes = {
	article: PropTypes.object.isRequired
};

export default ViewArticleSides;
