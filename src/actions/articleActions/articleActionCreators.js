import ACTION_TYPE from '../actionTypes';

export const addOneArticleActionCreator = (article) => ({
	type: ACTION_TYPE.ADD_ONE_ARTICLE,
	payload: article
});

export const addManyArticlesActionCreator = (articles) => ({
	type: ACTION_TYPE.ADD_MANY_FROM_SERVER,
	payload: articles
});

export const viewAllArticleActionCreator = () => ({
	type: ACTION_TYPE.VIEW_ALL_ARTICLES
});

export const viewOneArticleActionCreator = slug => ({
	type: ACTION_TYPE.VIEW_ONE_ARTICLE,
	payload: {slug}
});

export const deleteOneArticleActionCreator = slug => ({
	type: ACTION_TYPE.DELETE_ONE_ARTICLE,
	payload: {slug}
});

export const editOneArticleActionCreator = slug => ({
	type: ACTION_TYPE.EDIT_ONE_ARTICLE,
	payload: {slug}
});
