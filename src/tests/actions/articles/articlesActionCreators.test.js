import {
	addManyArticlesActionCreator,
	addOneArticleActionCreator,
	deleteOneArticleActionCreator,
	editOneArticleActionCreator,
	viewAllArticleActionCreator,
	viewOneArticleActionCreator
} from '../../../actions/articleActions/articleActionCreators';
import ACTION_TYPE from '../../../actions/actionTypes';

describe('Article Action Creators', () => {

	it('should return expected creators', () => {
		const addResp = {
			type: ACTION_TYPE.ADD_ONE_ARTICLE,
			payload: {}
		};
		expect(addOneArticleActionCreator({})).toEqual(addResp);

		const viewOneResp = {
			type: ACTION_TYPE.VIEW_ONE_ARTICLE,
			payload: {slug: {}}
		};
		expect(viewOneArticleActionCreator({})).toEqual(viewOneResp);

		const viewAllResp = {
			type: ACTION_TYPE.VIEW_ALL_ARTICLES
		};
		expect(viewAllArticleActionCreator({})).toEqual(viewAllResp);
		const editResp = {
			type: ACTION_TYPE.EDIT_ONE_ARTICLE,
			payload: {slug: {}}
		};
		expect(editOneArticleActionCreator({})).toEqual(editResp);

		const deleteResp = {
			type: ACTION_TYPE.DELETE_ONE_ARTICLE,
			payload: {slug: {}}
		};
		expect(deleteOneArticleActionCreator({})).toEqual(deleteResp);

		const manyResp = {
			type: ACTION_TYPE.ADD_MANY_FROM_SERVER,
			payload: {}
		};
		expect(addManyArticlesActionCreator({})).toEqual(manyResp);
	});
});
