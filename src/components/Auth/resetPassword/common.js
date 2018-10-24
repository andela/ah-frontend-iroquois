import React from 'react';
import { Link } from 'react-router-dom';

const SubmitContent = (newPasswordHasError, confirmHasError) => (
	<div className="row">
		<div className="input-field col s4 m6 l6">
			<button className='btn btn-small' disabled={newPasswordHasError || confirmHasError} type='submit'>
				Submit
			</button>
		</div>
		<div className="input-field col s8 m6 l6">
			<button className='btn btn-small white black-text'><Link to='/'>Cancel</Link></button>
		</div>
	</div>
);

export default SubmitContent;
