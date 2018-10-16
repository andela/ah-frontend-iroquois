import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../styles/navigation/NavBar.scss';

const items = [
	{route: 'new-articles', icon: 'fa-edit', text: 'New Article'},
	{route: 'articles', icon: 'fa-list-alt', text: 'Articles'},
	{route: 'profile', icon: 'fa-user-edit', text: 'Edit Profile'},
	{route: 'favourites', icon: 'fa-star', text: 'Favourites'},
	{route: 'logout', icon: 'fa-sign-out-alt', text: 'Logout'}
];

const buttonClassNames = classNames('btn-floating', 'btn-large', 'waves-effect waves-green');

const DropDownButton = () => (
	<div className={styles.bar}>
		<button type='button' className={buttonClassNames}>
			<img
				alt=''
				className={styles['profile-image']}
				src='http://www.macmillanenglish.com/img/author-image.png'
			/>
		</button>
		<i className='material-icons'>expand_more</i>
	</div>
);

const GenerateDropItem = (props) => (
	<Link to={`/${props.route}`}>
		<span>
			<i className={`fa fa-1x ${props.icon}`} />
			<span>
				{props.text}
			</span>
		</span>
	</Link>
);

const Dropdown = () => (
	<li className={styles.dropdown}>

		<DropDownButton />

		<div className={styles['dropdown-content']}>
			{items.map((item, index) => (<GenerateDropItem key={`${item.route}-${index * 2}`} {...item} />))}
		</div>
	</li>
);

GenerateDropItem.propTypes = {
	icon: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired
};

export default Dropdown;
