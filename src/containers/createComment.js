import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ViewComments from '../components/comments/viewComment';
import {createCommentAction} from '../actions/comments/commentActions';
import styles from '../styles/commentStyles/newComment.scss';

export class CreateComments extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			body: '',
			commentError: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleChange = (e) => {
		this.setState({body: e.target.value});
	};

	handleSubmit(event) {
		event.preventDefault();
		if(this.validateCommenting()){
		this.props.dispatch(createCommentAction(this.state, this.props.slug));
		this.setState({
			body: ''
		});
	}

	}

	handleCancel(event){
		event.preventDefault();
		this.setState({
			body: ''
		});
	}

	validateCommenting = () => {

		this.setState({
			commentError: '',
		});
		const {body} = this.state;
		let foundError = false;

		if (body.length === 0) {
			this.setState({commentError: 'Comment can\'t be empty'});
			foundError = true;

		}
		return !foundError;

	};

	render() {
		return (
			<ViewComments
				value={this.state.body}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				commentError={this.state.commentError}
				handleCancel={this.handleCancel}
				buttonsStyles={`row  right ${styles['buttons-styles']}`}
				labelComment={'Comment'}
				buttonText={'Comment'}
				cancelText={'Clear'}
			/>
		);
	}
}

CreateComments.propTypes = {
	dispatch: PropTypes.func.isRequired,
	slug: PropTypes.string.isRequired

};

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapDispatchToProps)(CreateComments);
