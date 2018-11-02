import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/reportArticleForm.scss';

const InputFields = ({ value, id, handleChange, issue }) =>

	(
		<React.Fragment>
			<input
				type='radio'
				id={id}
				value={value}
				className='with-gap'
				checked={issue === value}
				onChange={handleChange}
			/>
			<label htmlFor={id} className='black-text'>{value}</label>
		</React.Fragment>
	);

const ReportArticleForm = ({handleSubmit, issue, handleChange, handleClick}) =>

	(
		<form onSubmit={handleSubmit} className='report_form'>
			<InputFields id='immoral' value='It contains sexually inappropriate content' issue={issue} handleChange={handleChange} />
			<InputFields id='violence' value='It contains violent or prohibited content' issue={issue} handleChange={handleChange} />
			<InputFields id='misleading' value='It is misleading or a scam' issue={issue} handleChange={handleChange} />
			<InputFields id='plagiarism' value='It contains  plagiarised content' issue={issue} handleChange={handleChange} />
			<div className={`col s4 offset-s4 m4 offset-m4 ${styles['report-button']}`}>
				<button disabled={issue === ''} type='submit' className='btn btn-small teal darken-3 modal-trigger' onClick={handleClick}>Report</button>
			</div>
		</form>
	);

InputFields.propTypes = {
	issue: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

ReportArticleForm.propTypes = {
	issue: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default ReportArticleForm;
