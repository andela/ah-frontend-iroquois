import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FilterInputs from '../components/articles/filterInputs';

class FilterArticles extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			authors: this.props.authors,
			tag: '', title: '', author: ''
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const { authors } = nextProps;
		if (authors.length > this.state.authors) {
			this.setState({authors: nextProps.authors});
		}
	}

	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.handleFilterSubmit({...this.state});
	};

	render() {
		const { authors } = this.state;

		return (
			<FilterInputs onChange={this.onChange} handleSubmit={this.handleSubmit} authors={authors} />
		);
	}
}

FilterArticles.propTypes = {
	authors: PropTypes.array.isRequired,
	handleFilterSubmit: PropTypes.func.isRequired
};

export { FilterArticles as FilterArticlesTest };

const mapStateToProps = state => ({authors: state.articlesReducer.authors});

export default connect(mapStateToProps)(FilterArticles);
