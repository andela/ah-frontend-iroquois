import React from 'react';
import Footer from '../Footer/Footer';
import styles from '../../styles/LandingPage/LandingPage.scss';
import Notifications from "react-notify-toast";

const LandingPage = () => {
	return (
		<main>
            <Notifications/>
			<div className={styles.landing_page}>
				<div className={styles.landing_page_text}>
					<div className={styles.sloganStyle}>
						<h1 className='slogan'>A Social platform for the creative at heart</h1>
						<span>Community of like minded authors that fosters inspiration and innovation by leveraging the modern web.</span>
					</div>
				</div>
			</div>
			<Footer/>
		</main>
	);
};

export default LandingPage;
