import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import styles from '../styles/articleStyles/viewArticle.scss';
import ViewCard from '../components/articles/viewCard';
import {fetchAllArticles} from '../actions/articleActions/articleActions';
import {viewAllArticleActionCreator} from '../actions/articleActions/articleActionCreators';

class ViewAllArticles extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			articles: this.props.articles.results
		};
	}

	componentWillMount() {
		if (!this.state.articles || this.state.articles.length < 1) {
			this.props.dispatch(fetchAllArticles());
		} else { this.props.dispatch(fetchAllArticles(false)); }

		this.props.dispatch(viewAllArticleActionCreator());
	}

	componentDidMount() {
		this.timer = setInterval(this.loadAllArticles, 10000);
	}

	// noinspection JSUnusedLocalSymbols
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({articles: nextProps.articles.results});
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	loadAllArticles = () => this.props.dispatch(fetchAllArticles(false));

	render() {
		return (
			<div className={`row ${styles['card-row']}`}>
				<div className={`col s12 m12 l12 ${styles['card-col']}`}>
					{this.state.articles.map(article => <ViewCard key={article.slug} article={article} />)}
				</div>
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
