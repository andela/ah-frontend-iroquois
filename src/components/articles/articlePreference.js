import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';

const iconComponent = (dislikesCount, color, handleDislikeClick, icon) => (
	<div className='col s6 m6 l6'>
		<span className={`${color} ${styles.mousePointer}`}>
			<i className={icon} aria-hidden="true" onClick={handleDislikeClick} />
			{dislikesCount}
		</span>
	</div>
);

const ArticlePreference = ({article, likeColor, dislikeColor, handleLikeClick, handleDislikeClick}) => (
	<div className='col s8 offset-s2'>
		<div className='row'>

			{iconComponent(article.likes_count, likeColor,
				handleLikeClick, 'fa fa-thumbs-up fa-lg')}
			{iconComponent(article.dislikes_count, dislikeColor,
				handleDislikeClick, 'fa fa-thumbs-down fa-lg')}

		</div>
	</div>
);

ArticlePreference.propTypes = {
	handleLikeClick: PropTypes.func.isRequired,
	handleDislikeClick: PropTypes.func.isRequired,
	article: PropTypes.shape({
		likes_count: PropTypes.number,
		dislikes_count: PropTypes.number
	}).isRequired,
	likeColor: PropTypes.string.isRequired,
	dislikeColor: PropTypes.string.isRequired

};

export default ArticlePreference;
