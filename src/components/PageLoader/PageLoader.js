import * as PropTypes from 'prop-types';
import * as React from 'react';
import {connect} from 'react-redux';
import hourStyles from './PageLoader.scss';

const PageLoader = (props) => (

	props.isRequestLoading ?
		(
			<div className={hourStyles.wrapper}>
				<div className={hourStyles.blur} />
				<div className={hourStyles['lds-hourglass']} />
			</div>
		) : ('')

);

PageLoader.propTypes = {
	isRequestLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({...state.requestLoadingReducer});

export default connect(mapStateToProps)(PageLoader);
