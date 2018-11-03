import React from 'react';
import { Tabs, Tab } from 'react-materialize';
import classNames from 'classnames';
import styles from '../../styles/profile/profile.scss';
import {FollowingList, FollowersList} from './followingList';

const navTab = classNames(styles['nav-tab'], 'col', 's6', 'active');
const tabDemo = classNames(styles['nav-tab'], 'z-depth-1', 'tab-demo');
const display = classNames(styles.display, 's12', 'col');
const FollowProfile = (props) => (
	<div>
		<Tabs className={tabDemo}>
			<Tab title="Following" className={navTab}>
				<div className={styles.display}>
					<FollowingList {...props} handleChange={props.handleChange} />
				</div>
			</Tab>
			<Tab title="Followers" className='col s6'>
				<div className={display}>
					<FollowersList {...props} handleChange={props.handleChange} />
				</div>
			</Tab>
		</Tabs>
	</div>
);
export default FollowProfile;
