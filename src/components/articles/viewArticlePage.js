import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';
import ViewArticleSides from './viewArticleSides';
import ViewArticleHeader from './viewArticleHeader';
import ViewArticleBody from './viewArticleBody';
import ViewArticleFooter from './viewArticleFooter';

const ViewArticlePage = props => (
	<div className={styles['article-page']}>
		<div className='row'>
			<div className="col s12 m3 l3">
				<ViewArticleSides article={props.state.article} />
			</div>
			<div className="col s12 m9 l9">

				<ViewArticleHeader article={props.state.article} />

				<ViewArticleBody editorMode={props.state.editorMode} article={props.state.article} />

				<ViewArticleFooter
					authorName={props.state.article.author.username}
					tagList={props.state.article.tagList}
					setEditorMode={props.setEditorMode}
					deleteHandler={props.deleteHandler}
				/>
			</div>
		</div>
	</div>
);

ViewArticlePage.propTypes = {
	state: PropTypes.object.isRequired,
	setEditorMode: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired

};

export default ViewArticlePage;
