import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';
import ViewCard from './viewCard';
import FilterArticles from '../../containers/filterArticles';
import Pagination from '../../containers/pagination';

const ViewAllBody = ({ results, handleFilterSubmit, handlePageClick, pageCount }) => (
	<div className='container'>
		<div className={` ${styles['left-view']}`}>
			<FilterArticles handleFilterSubmit={handleFilterSubmit} />
		</div>

		<div className={`col s12 l9 m9 ${styles['right-view']}`}>

			<div>
				<div className={`row ${styles['card-row']}`}>
					<div className={`col s12 m12 l12 ${styles['card-col']}`}>
						{
							results.length > 0
								? results.map(article => <ViewCard key={article.slug} article={article} />)
								: <div><h5>No results Found</h5></div>
						}
					</div>
				</div>
			</div>
			{
				pageCount > 1
					? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
					: ''
			}
		</div>
	</div>
);

ViewAllBody.propTypes = {
	results: PropTypes.array.isRequired,
	pageCount: PropTypes.number.isRequired,
	handleFilterSubmit: PropTypes.func.isRequired,
	handlePageClick: PropTypes.func.isRequired
};

export default ViewAllBody;
