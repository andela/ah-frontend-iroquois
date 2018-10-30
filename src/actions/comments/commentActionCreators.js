import ACTION_TYPE from '../actionTypes';

export const addCommentActionCreator = (comment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment
});

export const getCommentsActionCreator = (comments) => ({
	type: ACTION_TYPE.GET_COMMENTS,
	payload: comments
});

export const deleteOneCommentActionCreator = id => ({
	type: ACTION_TYPE.DELETE_COMMENT,
	payload: {id}
});

export const editOneCommentActionCreator = id => ({
	type: ACTION_TYPE.DELETE_COMMENT,
	payload: {id}
});
