/* eslint-disable react/no-array-index-key */
import React from 'react';
import styles from '../../styles/logo.scss';

const Logo = () => (
	<div className={styles.stage}>
		{'1'.repeat(20).split('').map((ele, index) => <div key={ele + index} className={styles.layer} />)}
	</div>
);

export default Logo;
