import ACTION_TYPE from '../../actions/actionTypes';

const articlesState = {
	'links': {
		'next': null,
		'previous': null
	},
	'count': 0,
	'article': {},
	'articleEdit': {},
	message: '',
	'authors': [],
	'results': []
};

const reduce = (allArticles, action) => {
	let tempArticle;
	if (allArticles.length > 0) {
		tempArticle = allArticles.filter(article => article.slug === action.payload.slug);
		tempArticle = tempArticle.length > 0 ? tempArticle[0] : {};
	}
	return tempArticle;
};

const articlesReducerExtended = (state, action, allArticles) => {
	let articles = {};
	switch (action.type) {
		case ACTION_TYPE.VIEW_ONE_ARTICLE:
			return {...state, article: reduce(allArticles, action)};

		case ACTION_TYPE.DELETE_ONE_ARTICLE:

			if (allArticles.length > 0) {
				articles = allArticles.filter(article => article.slug !== action.payload.slug);
			}
			return {...state, results: articles};

		case ACTION_TYPE.EDIT_ONE_ARTICLE:
			return {...state, articleEdit: reduce(allArticles, action)};

		case ACTION_TYPE.REPORT_ARTICLE_FAILURE:
			return {...state,
				message: action.payload.message};

		case ACTION_TYPE.REPORT_ARTICLE_SUCCESS:
			return {...state,
				message: action.payload.message};

		default:
			return state;
	}
};

const articlesReducer = (state = articlesState, action) => {
	const allArticles = state.results;
	const payload = action.payload || {};
	let { results = [] } = payload;

	let authors = [];
	switch (action.type) {

		case ACTION_TYPE.ADD_MANY_FROM_SERVER:
			if (results && !Array.isArray(results)) {
				results = [results];
			}
			authors = Array.from(new Set(results.map(article => article.author.username)));
			return {...state, ...action.payload, results, authors};

		case ACTION_TYPE.ADD_ONE_ARTICLE:
			allArticles.unshift(action.payload);
			return {...state, results: allArticles};

		case ACTION_TYPE.VIEW_ALL_ARTICLES:
			return state;

		default:
			return articlesReducerExtended(state, action, allArticles);
	}
};

export default articlesReducer;
