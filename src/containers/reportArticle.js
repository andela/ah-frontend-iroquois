import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReportArticleForm from '../components/articles/reportArticleForm';
import { reportArticle } from '../actions/articleActions/reportArticleActions';

export class ReportArticle extends React.Component {

	state = {
		issue: ''
	};

	handleChange = (event) => {
		this.setState({
			issue: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(
			reportArticle({...this.state}, this.props.data.articlesReducer.article.slug)
		);
	};

	handleClick = () => {
		$('#reportModal').modal('close');
	};

	render() {

		return (
			<ReportArticleForm
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				handleClick={this.handleClick}
				{...this.state}
			/>
		);

	}
}

ReportArticle.propTypes = {
	dispatch: PropTypes.func.isRequired,
	data: PropTypes.shape({
		articlesReducer: PropTypes.object
	}).isRequired
};

const mapStateToProps = (state) => ({data: state});

export default connect(mapStateToProps)(ReportArticle);
