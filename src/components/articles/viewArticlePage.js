import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/viewArticle.scss';
import ViewArticleSides from './viewArticleSides';
import ViewArticleHeader from './viewArticleHeader';
import ViewArticleBody from './viewArticleBody';
import ViewArticleFooter from './viewArticleFooter';

const ViewArticlePage = props => {

	const { article, editorMode } = props.data;
	const { tagList, author } = article;

	return (
		<div className={styles['article-page']}>
			<div className='row'>
				<div className="col s12 m3 l3">
					<ViewArticleSides article={article} />
				</div>
				<div className="col s12 m9 l9">

					<ViewArticleHeader article={article} />

					<ViewArticleBody editorMode={editorMode} article={article} />

					<ViewArticleFooter
						authorName={author.username}
						tagList={tagList}
						setEditorMode={props.setEditorMode}
						deleteHandler={props.deleteHandler}
					/>
				</div>
			</div>
		</div>
	);
};

ViewArticlePage.propTypes = {
	data: PropTypes.object.isRequired,
	setEditorMode: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired

};

export default ViewArticlePage;
