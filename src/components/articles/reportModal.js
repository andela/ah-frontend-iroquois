import React from 'react';
import { Modal } from 'react-materialize';
import styles from '../../styles/articleStyles/viewArticle.scss';
import ReportArticle from '../../containers/reportArticle';

const ReportModal = () => (

	<div className='row'>
		<Modal
			id='reportModal'
			className={styles['report-model']}
			actions=''
			trigger={<div className='col sm12 m8 l8 left-align valign-wrapper'><a href='#'>Report article</a></div>}
		>
			<div className='row'>
				<h5 className='center'>Report Article</h5>
				<hr />
				<div className='col'>
					<h6 className={styles['report-question']}>Why is it inappropriate?</h6>
					<ReportArticle />
				</div>
			</div>
		</Modal>
	</div>

);

export default ReportModal;
