import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetchAllArticles} from '../actions/articleActions/articleActions';
import {viewAllArticleActionCreator} from '../actions/articleActions/articleActionCreators';
import ViewAllBody from '../components/articles/viewAllBody';

class ViewAllArticles extends React.Component {

	constructor(props) {
		super(props);

		const articles = this.props.articles || this.props.article;

		this.state = {
			initial: true,
			pageCount: 0,
			page: 1, limit: 10, offset: 0,
			tag: '', title: '', author: '',
			articles
		};
	}

	componentWillMount() {
		const { articles } = this.state;
		const { results, count } = articles;

		if (!results || count < 1) {
			this.loadAllArticles(true);
		} else { this.loadAllArticles(false); }

		this.props.dispatch(viewAllArticleActionCreator());
	}

	// noinspection JSUnusedLocalSymbols
	componentWillReceiveProps(nextProps, nextContext) {
		const articles = nextProps.articles || [nextProps.article];

		this.setState(prevState => ({
			articles,
			pageCount: Math.ceil(articles.count / prevState.limit)
		}));
	}

	loadAllArticles = (load = false) => {
		const {limit, offset, page, tag, title, author } = this.state;

		const pager = author || title || tag ? 1 : page;

		const queryParams = `?author=${author}&tag=${tag}&title=${title}&page=${pager}&limit=${limit}&offset=${offset}`;
		this.props.dispatch(fetchAllArticles(load, queryParams));
	};

	loadViewAll = () => this.props.dispatch(viewAllArticleActionCreator());

	handlePageClick = (data) => {
		const { selected } = data;
		this.setState({page: (selected + 1), articles: {results: []}}, () => {
			this.loadAllArticles(true);
		});
	};

	handleFilterSubmit = data => {
		this.setState({...data}, () => this.loadAllArticles(true));
	};

	render() {
		const { articles, pageCount } = this.state;
		const { results } = articles;

		return (
			<ViewAllBody
				results={results}
				handleFilterSubmit={this.handleFilterSubmit}
				pageCount={pageCount}
				handlePageClick={this.handlePageClick}
			/>
		);
	}
}

ViewAllArticles.propTypes = {
	articles: PropTypes.object.isRequired,
	article: PropTypes.object,
	dispatch: PropTypes.func.isRequired
};

ViewAllArticles.defaultProps = {
	article: {result: []}
};

export { ViewAllArticles as ViewAllTest };

const mapStateToProps = state => ({articles: state.articlesReducer});
const mapDispatchToProps = dispatch => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAllArticles));
