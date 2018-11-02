import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/commentStyles/newComment.scss';

let styleSubmit =styles.submit;
const ViewComments = ({handleChange, value, labelComment, commentError, buttonsStyles, handleSubmit, handleCancel, cancelText,buttonText}) => (
	<div>
		<div className='row'>
			<div className="input-field col s6 l9">
				<input id="body" type="text" name='body' onChange={handleChange} value={value} className="validate" >
				</input>
				<label className='active' htmlFor="comments">{labelComment}</label>
				<div className={styles['error-text-comment']}>{commentError}</div>
			</div>
		</div>
		<div className={buttonsStyles}>
			<div className={`col`}>
				<button type='button' className={`btn waves-effect waves-light ${styleSubmit}`} onClick={handleSubmit}>{buttonText}</button>
			</div>
			<div className={`col`}>
				<button type='button' className={`btn waves-effect waves-light ${styles.clear}`} onClick={handleCancel}>{cancelText}</button>
			</div>
		</div>
	</div>
);

ViewComments.propTypes = {
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel:PropTypes.func.isRequired,
	labelComment:PropTypes.string.isRequired,
	buttonText:PropTypes.string.isRequired,
	cancelText:PropTypes.string.isRequired,
	buttonsStyles:PropTypes.string.isRequired


};

export default ViewComments;
