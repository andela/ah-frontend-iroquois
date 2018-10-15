import React from 'react';
import styles from '../../styles/logo/Logo.scss';

export const Logo = () => {
	return (
		<div className={styles.stage}>

			{'1'.repeat(20).split('').map((ele, index) => <div key={ele + index} className={styles.layer}></div>)}

		</div>
	);
};
