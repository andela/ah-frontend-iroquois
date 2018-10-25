import * as PropTypes from 'prop-types';
import React from 'react';

const CustomSvgIcon = props => (
	<svg
		version="1.1"
		x="0px"
		y="0px"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill={props.color}
	>
		<path d={props.icon} />
	</svg>
);

CustomSvgIcon.propTypes = {
	icon: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired
};

export default CustomSvgIcon;
