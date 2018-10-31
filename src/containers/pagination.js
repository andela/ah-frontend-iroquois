import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../styles/articleStyles/viewArticle.scss';

const Pagination = props => (
	<div className='row'>
		<div className='col s12 l12 m12'>
			<ReactPaginate
				previousLabel="previous"
				nextLabel="next"
				breakLabel={<Link to="/articles" replace>...</Link>}
				pageCount={props.pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={props.handlePageClick}
				disabledClassName={`${styles.disabled}`}
				containerClassName={`${styles.pagination} pagination`}
				subContainerClassName="pages pagination"
				activeClassName={` active ${styles.active}`}
			/>
		</div>
	</div>
);

Pagination.propTypes = {
	pageCount: PropTypes.number.isRequired,
	handlePageClick: PropTypes.func.isRequired
};

export default Pagination;
