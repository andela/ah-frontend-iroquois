import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ViewArticlePage from '../components/articles/viewArticlePage';
import {deleteArticle, fetchAllArticles} from '../actions/articleActions/articleActions';
import {
	editOneArticleActionCreator,
	viewOneArticleActionCreator
} from '../actions/articleActions/articleActionCreators';
import '../static/js/material-dialog';
import styles from '../styles/articleStyles/viewArticle.scss';

class ViewArticle extends React.Component {

	slug = '';

	constructor(props) {
		super(props);
		this.state = {
			article: {},
			editorMode: false
		};
	}

	componentWillMount() {
		this.slug = this.props.match.params.slug || '';
		this.loadArticles();
		this.loadOneArticle();
		this.setState({article: this.props.article});
	}

	// noinspection JSUnusedLocalSymbols
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({article: nextProps.article});
	}

	loadArticles = () => this.props.dispatch(fetchAllArticles(false));

	loadOneArticle = () => this.props.dispatch(viewOneArticleActionCreator(this.slug));

	// noinspection JSUnusedLocalSymbols
	setEditorMode = (e) => {
		this.props.dispatch(editOneArticleActionCreator(this.slug));
		this.props.history.push({
			pathname: '/new-articles',
			state: { slug: this.slug }});
	};

	modalCallback = () => this.props.dispatch(deleteArticle(this.slug, this.props.history));

	// noinspection JSUnusedLocalSymbols
	deleteHandler = (event) => {
		window.MaterialDialog.dialog(
			'<h6>Do you want to delete this Article?</h6>',
			{
				title: `Title: ${this.state.article.title}`,
				buttons: {
					close: {
						text: 'Cancel',
						className: styles['modal-no']
					},
					confirm: {
						className: styles['modal-yes'],
						text: 'Delete',
						modalClose: true,
						callback: this.modalCallback
					}
				}
			}
		);
	};

	render() {
		return (
			!this.state.article || !this.state.article.author
				? ''
				: (
					<ViewArticlePage
						data={{...this.state}}
						setEditorMode={this.setEditorMode}
						deleteHandler={this.deleteHandler}
					/>
				)
		);
	}
}

ViewArticle.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({slug: PropTypes.string})
	}),
	history: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	article: PropTypes.object
};

ViewArticle.defaultProps = {
	match: {params: {slug: ''}},
	article: {}
};

export { ViewArticle as ViewArticleTest };

const mapStateToProps = state => ({ article: state.articlesReducer.article });

const mapDispatchToProps = dispatch => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewArticle));
