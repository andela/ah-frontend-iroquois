import ACTION_TYPE from '../../../actions/actionTypes';
import {
	addCommentActionCreator,
	deleteOneCommentActionCreator, editOneCommentActionCreator,
	getCommentsActionCreator
} from '../../../actions/comments/commentActionCreators';

describe('Comment Action Creators', () => {

	let comment ='';
	let id ='';
	it('should return expected creators', () => {
		const addComm = {
			type: ACTION_TYPE.ADD_COMMENT,
			payload: comment
		};
		expect(addCommentActionCreator(comment)).toEqual(addComm);

		const getComm = {
			type: ACTION_TYPE.GET_COMMENTS,
			payload: comment
		};
		expect(getCommentsActionCreator(comment)).toEqual(getComm);

		const delComm = {
			type: ACTION_TYPE.DELETE_COMMENT,
			payload: {id}
		};
		expect(deleteOneCommentActionCreator(id)).toEqual(delComm);
		const editComm = {
			type: ACTION_TYPE.DELETE_COMMENT,
			payload: {id}
		};
		expect(editOneCommentActionCreator(id)).toEqual(editComm);

	});
});
