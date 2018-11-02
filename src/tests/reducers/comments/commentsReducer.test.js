import ACTION_TYPE from '../../../actions/actionTypes';
import {EnhancerOptions as undefined} from 'redux-devtools-extension';
import commentsReducer from '../../../reducers/commentReducers/commentsReducers';

describe('Article reduces', () => {

	it('should test add one article reducer', () => {
		const initialState = {
			comments: []
		};
		const expected =   {"comments": undefined}
		const action = {type: ACTION_TYPE.GET_COMMENTS, payload: {}};

		expect(commentsReducer(initialState, action)).toEqual(expected);
	});

});
