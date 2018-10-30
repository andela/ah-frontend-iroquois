import React from 'react';
import  PropTypes from 'prop-types';
import styles from '../../styles/commentStyles/newComment.scss';
import {IMG} from '../articles/viewCard';
import {formatDate} from '../../utils';
import {Modal} from 'react-materialize';
import ViewComments from './viewComment';
import {USERNAME_KEY} from '../../constants';

const ViewListComments = ({comments,author,created_at,body,openModalHandler,editComment,deleteComment,modalCallEdit,handleChange,clearHandler}) => (
	<div className={styles['comments-list']}>
		<h5 className={styles['comment-header']}>Comments</h5>
		<ul className="collection">
			{comments.map(comment =>
				<li className="collection-item avatar" key={comment.id}>
					<img src={IMG} alt="" className="circle"/>
					<span className="title"><b>{comment.author}</b></span><br/>
					<span className={`title ${styles['date-font-size']}`}><i>{formatDate(comment.created_at)}</i></span>
					<p className={styles['comment-body']}>
						<br/>
						{comment.body}
					</p>
					<div className="secondary-content row">
						<div><i className={`material-icons col s1 ${styles['icons-color-comment']}`}>reply</i></div>
						{  comment.author === localStorage.getItem(USERNAME_KEY)
							?
							(
							<div>
								<i className={`edit_comment  material-icons col s1 ${styles['icons-color-comment']}`} onClick={() => {
									openModalHandler();
									editComment(comment)
								}}>edit</i>
								 <i className={`delete_comment material-icons col s1 ${styles['icon-red']}`} onClick={() => deleteComment(comment.id)}>delete</i>
							</div>
						    )
							:''
						}
					</div>
					<div>
						<Modal
							id='foo'
							actions=""
							className={styles['align-edit-modal']}
							header=''>
							<ViewComments
								handleSubmit={modalCallEdit}
								value={body}
								handleChange={handleChange}
								buttonsStyles={`row  right ${styles['edit-buttons-styles']}`}
								labelComment={'Edit Comment'}
								buttonText={'Edit'}
								cancelText={'Clear'}
								handleCancel={clearHandler}
							/>
						</Modal>
					</div>

				</li>)}
		</ul>
	</div>
);

ViewListComments.propTypes = {
	body: PropTypes.string.isRequired
};

export default ViewListComments;
