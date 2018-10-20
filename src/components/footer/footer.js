import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/footer.scss';

const DisplayCard = (props) => {
	const cardDetails = props.card;
	return (
		<div className="col s3">
			<div className={`card small ${styles.card}`}>
				<div className="card-content">
					<p>
						<i style={{ color: '#3c8176' }} className={cardDetails.icon1} />
						<i style={{ color: '#3c8176' }} className={cardDetails.icon2} />
					</p>
					<p style={{ marginTop: '1.5em' }}>{cardDetails.textDisplay}</p>
				</div>
			</div>
		</div>
	);
};
const cards = [{
		icon1: 'fas fa-user-edit medium right',
		textDisplay: 'We believe you are an insightful writer. Write your amazing story. Write on anything.  '
	},
	{
		icon1: 'fas fa-book-reader medium',
		textDisplay: 'Read articles of the most insightful writers, thinkers, and storytellers on topics that matter and of your interest.'
	},
	{
		icon1: 'fas fa-comments medium',
		textDisplay: 'Comment on any article with your great thoughts. Your fresh thinking and unique perspectives are appreciated.'
	},
	{
		icon1: 'fas fa-thumbs-up medium',
		icon2: 'fas fa-thumbs-down medium right',
		textDisplay: 'You can like and dislike articles as you please. Express your emotions out loud with a like or a dislike. We care about your feelings.'
	}
	];
const Footer = () => {
	return (
		<footer className={`page-footer blue-grey lighten-4 ${styles.footer}`}>
			<div className="container">
				<div className="row" />
				<div className={`row ${styles.cards}`}>
					{cards.map((card, index) => (<DisplayCard key={card.icon1 + index} card={card} />))}
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container center-align grey-text text-darken-4">© 2018 Authors Haven</div>
			</div>
		</footer>
	);
};

DisplayCard.propTypes = {
	card: PropTypes.shape({
		icon1: PropTypes.string.isRequired,
		textDisplay: PropTypes.string.isRequired
	})
};

export default Footer;
