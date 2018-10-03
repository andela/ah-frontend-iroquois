import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../../styles/articleStyles/NewArticle.scss';

const values = [
	{href: 'new-articles', name: 'create article', icon: 'fa-edit'},
	{href: 'favourites', name: 'favorites', icon: 'fa-star'}
];

export const generateNavName = (field) => (
	<span>
		<i className={`fa fa-1x ${field.icon}`} />
		<span>{field.text || field.name}</span>
	</span>
);

const generateNavLinks = () => values.map((field) => (
	<li key={field.name}>
		<Link className={styles['navBar-links']} to={`/${field.href}`} replace>
			{generateNavName(field)}
		</Link>
	</li>
));

export default generateNavLinks;
