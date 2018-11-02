import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ArticlePreference from '../components/articles/articlePreference';
import LikeArticlePreference from '../actions/articleActions/articlePreferenceAction';
import {USERNAME_KEY} from '../constants';

const defaultColor = 'grey-text';
const finalColor = 'teal-text';

export class ArticlePreferenceContainer extends React.Component {

	state = {
		likeColor: 'grey-text',
		dislikeColor: 'grey-text'
	};

	componentWillMount() {

		const {likes, dislikes} = this.props.data;

		if (likes.includes(localStorage.getItem(USERNAME_KEY))) {
			this.setState({likeColor: finalColor, dislikeColor: defaultColor});
		} else if (dislikes.includes(localStorage.getItem(USERNAME_KEY))) {
			this.setState({likeColor: defaultColor, dislikeColor: finalColor});
		} else {
			this.setState({likeColor: defaultColor, dislikeColor: defaultColor});
		}

	}

	determineColor = (like, dislike, likeOrDislike) => {

		if (likeOrDislike === defaultColor) {
			return this.setState({likeColor: like, dislikeColor: dislike});
		} 
		return this.setState({likeColor: defaultColor, dislikeColor: defaultColor});
		
	};

	dislikeDispatcher = (preference) => this.props.dispatch(LikeArticlePreference(this.props.article.slug, preference));

	handleLikeClick = () => {
		this.dislikeDispatcher('like');
		this.determineColor(finalColor, defaultColor, this.state.likeColor);

	};

	handleDislikeClick = () => {

		this.dislikeDispatcher('dislike');
		this.determineColor(defaultColor, finalColor, this.state.dislikeColor);
	};

	render() {
		return (
			<ArticlePreference
				{...this.props}
				{...this.state}
				handleLikeClick={this.handleLikeClick}
				handleDislikeClick={this.handleDislikeClick}
			/>
		);
	}
}

ArticlePreferenceContainer.propTypes = {

	data: PropTypes.shape({
		likes: PropTypes.array,
		dislikes: PropTypes.array
	}).isRequired,
	article: PropTypes.shape({
		slug: PropTypes.string
	}).isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({data: state.articlesReducer.article});
export default connect(mapStateToProps)(ArticlePreferenceContainer);
