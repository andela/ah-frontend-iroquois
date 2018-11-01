import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/articleStyles/viewArticle.scss';
import ViewCard from '../components/articles/viewCard';
import {fetchAllArticles} from '../actions/articleActions/articleActions';
import {viewAllArticleActionCreator} from '../actions/articleActions/articleActionCreators';
import Pagination from './pagination';

class ViewAllArticles extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			articles: this.props.articles,
			pageCount: 0,
			page: 1,
			limit: 10,
			offset: 0
		};
	}

	componentWillMount() {
		const { articles } = this.state;

		if (!articles.results || articles.count < 1) {
			this.loadAllArticles(true);
		} else { this.loadAllArticles(false); }

		this.props.dispatch(viewAllArticleActionCreator());
	}

	// noinspection JSUnusedLocalSymbols
	componentWillReceiveProps(nextProps, nextContext) {
		const { articles } = nextProps;

		this.setState(prevState => ({
			articles,
			pageCount: Math.ceil(articles.count / prevState.limit)
		}));
	}

	loadAllArticles = (load = false) => {
		const {limit, offset, page } = this.state;

		const queryParams = `?page=${page}&limit=${limit}&offset=${offset}`;
		this.props.dispatch(fetchAllArticles(load, queryParams));
	};

	loadViewAll = () => this.props.dispatch(viewAllArticleActionCreator());

	handlePageClick = (data) => {
		const { selected } = data;
		this.setState({page: (selected + 1), articles: {results: []}}, () => {
			this.loadAllArticles(true);
		});
	};

	render() {
		const { articles, pageCount } = this.state;
		const { results } = articles;

		return (
			<div>
				<div className={`row ${styles['card-row']}`}>
					<div className={`col s12 m12 l12 ${styles['card-col']}`}>
						{results.map(article => <ViewCard key={article.slug} article={article} />)}
					</div>
				</div>

				<Pagination pageCount={pageCount} handlePageClick={this.handlePageClick} />
			</div>
		);
	}
}

ViewAllArticles.propTypes = {
	articles: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

export { ViewAllArticles as ViewAllTest };

const mapStateToProps = state => ({articles: state.articlesReducer});
const mapDispatchToProps = dispatch => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAllArticles));
