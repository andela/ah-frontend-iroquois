import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {formatName, image} from '../../utils/index';
import ArticlePreferenceContainer from '../../containers/articlePreference';

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
						<Link style={{color: '#F18F01'}} to={`/profile/${props.article.author.username}`}>{formatName(props.article.author.username)}</Link>
					</span>
				</div>
			</div>
			<div className='row'>
				{/*like and dislike*/}
				<ArticlePreferenceContainer article={article} />
			</div>
		</div>
	);
};

ViewArticleSides.propTypes = {
	article: PropTypes.object.isRequired
};

export default ViewArticleSides;
