import React, {Component} from 'react';
import styles from './index.scss';

class App extends Component {
	render() {
		return (
			<div className={styles.text_color}>
				<h1>Welcome to Authors Haven</h1>
				<hr/>
				<p><b>Our React application is now setup to support sass. We can use both .css and .scss files</b></p>
			</div>
		);
	}

}

export default App;
