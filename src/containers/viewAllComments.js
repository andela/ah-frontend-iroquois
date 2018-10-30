import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/commentStyles/newComment.scss';
import {deleteComment, editCommentAction} from '../actions/comments/commentActions';
import '../static/js/material-dialog';
import ViewListComments from '../components/comments/viewListComments';

class ViewAllComments extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			body: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.clearHandler = this.clearHandler.bind(this);
	}

	modalCallback = () => this.props.dispatch(deleteComment(this.state.deleteId,this.props.slug));
	modalCallEdit =()=> this.props.dispatch(editCommentAction(this.state.editId, this.state, this.props.slug) );

	handleChange = (e) => {
		this.setState({body: e.target.value});
	};

	deleteComment = (id) => {
		this.setState({deleteId: id});
		let buttonText ='Cancel';
		let buttonStyles = styles['modal-no'];

		window.MaterialDialog.dialog(
			'<h6>Do you want to delete this Comment?</h6>',
			{
				title: ``,
				buttons: {
					close: {
						text: buttonText,
						className: buttonStyles
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

	editComment = (comment) => {
		this.setState({editId: comment.id, body:comment.body});
	};

	clearHandler(event){
		event.preventDefault();
		this.setState({
			body: ''
		});
	}

	openModalHandler =()=>{
		$('#foo').modal('open');
	};

	render() {

		const  { comments }  = this.props.article;

		return (
			<div>
				<ViewListComments
					comments={comments}
					openModalHandler={this.openModalHandler}
					handleChange={this.handleChange}
					clearHandler={this.clearHandler}
					deleteComment={this.deleteComment}
					modalCallEdit={this.modalCallEdit}
					editComment={this.editComment}
					body={this.state.body}
					obj={this}
				/>
			</div>

		);
	}
}

ViewAllComments.propTypes = {
	dispatch: PropTypes.func.isRequired,
	slug: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({dispatch});

export { ViewAllComments as ViewAllCommentsTest };


export default connect(mapDispatchToProps)(ViewAllComments);
