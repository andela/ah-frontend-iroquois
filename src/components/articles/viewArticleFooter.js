import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';
import {USERNAME_KEY} from '../../constants';
import {generateButton} from '../../utils';
import ReportModal from './reportModal';

export const CustomChips = props => (
	<div className='chip'>
		{props.name}
	</div>
);

CustomChips.propTypes = {
	name: PropTypes.string.isRequired
};

const ViewArticleFooter = props => {

	const { setEditorMode, deleteHandler, tagList, authorName } = props;

	const name = localStorage.getItem(USERNAME_KEY);
	const editButton = {handler: setEditorMode, className: `btn btn-small ${styles.edit}`, icon: 'fa fa-edit'};
	const deleteButton = {className: `btn btn-small ${styles.trash}`, icon: 'fa fa-trash', handler: deleteHandler};

	return (
		<div>
			<div className='row'>
				<div className='col sm12 m8 l8 left-align valign-wrapper'>
					<b style={{marginRight: '1em'}}>Tags:</b>
					{tagList.map(chip => <CustomChips key={chip} name={chip} />)}
				</div>
				{
					name === authorName
						? (
							<div className={`col sm12 m4 l4 right-align ${styles['utils-buttons']}`}>
								{generateButton(editButton)}
								{generateButton(deleteButton)}
							</div>)
						: ''
				}
			</div>
			<ReportModal />
		</div>
	);
};

ViewArticleFooter.propTypes = {
	tagList: PropTypes.array.isRequired,
	setEditorMode: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
	authorName: PropTypes.string.isRequired
};

export default ViewArticleFooter;
