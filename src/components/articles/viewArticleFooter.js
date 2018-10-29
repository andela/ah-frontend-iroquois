import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';
import {USERNAME_KEY} from '../../constants/index';
import {generateButton} from '../../utils';

const ViewArticleFooter = props => {
	const name = localStorage.getItem(USERNAME_KEY);
	const editButton = {handler: props.setEditorMode, className: `btn btn-small ${styles.edit}`, icon: 'fa fa-edit'};
	const deleteButton = {className: `btn btn-small ${styles.trash}`, icon: 'fa fa-trash', handler: props.deleteHandler};

	return (
		<div className='row'>
			<div className='col sm12 m8 l8 left-align valign-wrapper'>
				<b style={{marginRight: '1em'}}>Tags:</b>
			</div>
			{
				name === props.authorName
					? (
						<div className={`col sm12 m4 l4 right-align ${styles['utils-buttons']}`}>
							{generateButton(editButton)}
							{generateButton(deleteButton)}
						</div>)
					: ''
			}
		</div>
	);
};

ViewArticleFooter.propTypes = {
	setEditorMode: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
	authorName: PropTypes.string.isRequired
};

export default ViewArticleFooter;
