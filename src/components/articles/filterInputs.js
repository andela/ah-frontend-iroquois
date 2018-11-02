import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/filterArticles.scss';
import {formatName} from '../../utils';

const FilterInputs = ({ authors, onChange, handleSubmit }) => (
	<div className='row'>
		<div className={`col s12 m12 l12 ${styles['search-container']}`}>
			<div className={styles['input-field']}>
				<input type="text" name='author' placeholder='author' onChange={onChange} list="authors" />
				<datalist id="authors">
					{authors.map(name => <option key={name}>{formatName(name)}</option>)}
				</datalist>
			</div>
			<div className={styles['input-field']}>
				<input onChange={onChange} type='text' placeholder='title' name='title' />
			</div>
			<div className={styles['input-field']}>
				<input type='text' name='tag' placeholder='tag name / keyword' onChange={onChange} />
			</div>
			<div className={styles['input-field']}>
				<button type='button' className='btn btn-small' onClick={handleSubmit}>
					<i className='fa fa-search' />
					<span>Filter</span>
				</button>
			</div>
		</div>
	</div>
);

FilterInputs.propTypes = {
	authors: PropTypes.array,
	onChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

FilterInputs.defaultProps = {
	authors: []
};

export default FilterInputs;
