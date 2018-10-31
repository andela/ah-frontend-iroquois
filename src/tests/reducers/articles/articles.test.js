import {EnhancerOptions as undefined} from 'redux-devtools-extension';
import articlesReducer from '../../../reducers/articleReducers/articlesReducers';
import ACTION_TYPE from '../../../actions/actionTypes';

describe('Article reduces', () => {

	it('should test add one article reducer', () => {
		const expected = {
			'article': {},
			'articleEdit': {},
			'authors': [],
			'count': 0,
			'links': {'next': null, 'previous': null},
			'results': [{}]
		};

		const action = {type: ACTION_TYPE.ADD_ONE_ARTICLE, payload: {}};

		expect(articlesReducer(undefined, action)).toEqual(expected);
		expect(articlesReducer(undefined, {type: ACTION_TYPE.VIEW_ALL_ARTICLES})).toEqual(expected);
	});

	it('should test add many article reducer', () => {
		const expected = {
			'article': {},
			'articleEdit': {},
			'authors': [],
			'count': 0,
			'links': {'next': null, 'previous': null},
			'results': []
		};

		let action = {type: ACTION_TYPE.ADD_MANY_FROM_SERVER, payload: {}};

		expect(articlesReducer(undefined, action)).toEqual(expected);

		const expectedData = {'article': {}, 'articleEdit': {}, 'authors': [undefined], 'count': 0, 'links': {'next': null, 'previous': null}, 'results': [{'author': {}}]};

		action = {type: ACTION_TYPE.ADD_MANY_FROM_SERVER, payload: {results: {author: {}}}};

		expect(articlesReducer(undefined, action)).toEqual(expectedData);
	});

	it('should test view one article reducer', () => {
		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': undefined,
			'articleEdit': undefined,
			'results': []
		};

		const action = {type: ACTION_TYPE.VIEW_ONE_ARTICLE, payload: {slug: ''}};

		expect(articlesReducer(expected, action)).toEqual(expected);
	});

	it('should test view one article reducer with one article', () => {
		const initial = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {},
			'results': [{slug: 'me'}]
		};

		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {'slug': 'me'},
			'articleEdit': {},
			'results': [{slug: 'me'}]
		};

		const action = {type: ACTION_TYPE.VIEW_ONE_ARTICLE, payload: {slug: 'me'}};

		expect(articlesReducer(initial, action)).toEqual(expected);
	});

	it('should test view one article reducer with one but not matching', () => {
		const initial = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {},
			'results': [{slug: 'me'}]
		};

		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {},
			'results': [{slug: 'me'}]
		};

		const action = {type: ACTION_TYPE.VIEW_ONE_ARTICLE, payload: {slug: 'me-dont-match'}};

		expect(articlesReducer(initial, action)).toEqual(expected);
	});

	it('should test edit one article reducer with zero length', () => {
		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': undefined,
			'results': []
		};
		const action = {type: ACTION_TYPE.EDIT_ONE_ARTICLE, payload: {slug: ''}};

		expect(articlesReducer(expected, action)).toEqual(expected);
	});

	it('should test edit one article reducer with one article but no match', () => {
		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {},
			'results': [{slug: 'me'}]
		};
		const action = {type: ACTION_TYPE.EDIT_ONE_ARTICLE, payload: {slug: 'don\'t-match'}};

		expect(articlesReducer(expected, action)).toEqual(expected);
	});

	it('should test edit one article reducer with one article and one match', () => {
		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {slug: 'match'},
			'results': [{slug: 'match'}]
		};
		const action = {type: ACTION_TYPE.EDIT_ONE_ARTICLE, payload: {slug: 'match'}};

		expect(articlesReducer(expected, action)).toEqual(expected);
	});

	it('should test delete one article reducer with no articles in store', () => {
		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {},
			'results': {}
		};

		const action = {type: ACTION_TYPE.DELETE_ONE_ARTICLE, payload: {slug: ''}};

		expect(articlesReducer(expected, action)).toEqual(expected);
	});

	it('should test delete one article reducer with a matching article in store', () => {
		const initial = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {},
			'results': [{slug: 'match'}]
		};

		const expected = {
			'links': {
				'next': null,
				'previous': null
			},
			'count': 0,
			'article': {},
			'articleEdit': {},
			'results': []
		};
		const action = {type: ACTION_TYPE.DELETE_ONE_ARTICLE, payload: {slug: 'match'}};

		expect(articlesReducer(initial, action)).toEqual(expected);
	});

});
