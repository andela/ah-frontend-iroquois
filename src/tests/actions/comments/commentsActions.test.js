/* eslint-disable import/no-extraneous-dependencies */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import {API_URLS, AUTH_TOKEN} from '../../../constants';
import {
	callThis,
	createCommentAction,
	deleteComment,
	editCommentAction
} from '../../../actions/comments/commentActions';
import {viewOneArticleActionCreator} from '../../../actions/articleActions/articleActionCreators';

const mockStore = configureStore([thunk]);
let store = {};
jest.mock('react-notify-toast');

describe('Comment Actions', () => {

	beforeEach(() => {
		moxios.install();
		store = mockStore({});
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should test fetch comments per article', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES+'great-work/comment/', {
			status: 201,
			response: { comments: {
					id: 16,
					body: "How can I rebase on 2 different branches",
					article: "great-work"
				}
			},


	});

		const expecting = {"payload": {"slug": "slug"}, "type": "VIEW_ONE_ARTICLE"};
		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'payload': {}, 'type': 'ADD_MANY_FROM_SERVER'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];



		store.dispatch(createCommentAction({"comment": {"body": "Thanks for the nice article. "}}, 'great-work'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});

		expect(store.dispatch(viewOneArticleActionCreator('slug'))).toEqual(expecting);

		jest.mock('react-notify-toast');
	});

	it('should test fetch comments per article 2 ', () => {
		moxios.wait(API_URLS.FETCH_ALL_ARTICLES+'great-work/comment/', {
			status: 400,
			response: {error: {}}
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];

		store.dispatch(createCommentAction({"comment": {"body": "Thanks for the nice article. "}}, 'great-work'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});


	it('should test fail fetch comments per article ', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES+'great-work/comment/', {
			status: 400,
			response: {error: {}}
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];

		store.dispatch(createCommentAction({"comment": {"body": "Thanks for the nice article. "}}, 'great-work'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

	it('should test delete comment', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES+'comment/2/', {
			status: 204
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(deleteComment(2,'slug')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test fail delete comment', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES+'comment/2/', {
			status: 400
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(deleteComment(2,'slug')).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});

	});

	it('should test edit comment', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES+'comment/2/', {
			status: 200,
			response: {}
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(editCommentAction(2,{"body":"am good to go."},'slug')
		).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should test fail edit comment', () => {
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES+'comment/2/', {
			status: 400,
			response: {}
		});

		const expectedActions = [
			{'isRequestLoading': true, 'type': 'REQUEST_LOADING'},
			{'isRequestLoading': false, 'type': 'REQUEST_LOADING'}
		];
		store.dispatch(editCommentAction(2,{"body":"am good to go."},'slug')
		).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});




});
