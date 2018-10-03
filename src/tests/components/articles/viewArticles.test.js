import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {mount, shallow} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import moxios from 'moxios';
import ViewAll, {ViewAllTest} from '../../../containers/viewAllArticles';
import ViewArticle, {ViewArticleTest} from '../../../containers/viewArticle';
import {API_URLS, USERNAME_KEY} from '../../../constants';
import ViewArticleHeader from '../../../components/articles/viewArticleHeader';
import ViewArticleFooter from '../../../components/articles/viewArticleFooter';
import ViewArticleSides from '../../../components/articles/viewArticleSides';
import ViewArticlePage from '../../../components/articles/viewArticlePage';
import ViewArticleBody from '../../../components/articles/viewArticleBody';

let wrapper;
const mockStore = configureStore([thunk]);
let store;

jest.mock('@ckeditor/ckeditor5-react');
jest.mock('@ckeditor/ckeditor5-build-decoupled-document');
jest.mock('jquery');

window.MaterialDialog.dialog = jest.fn();

describe('View Articles', () => {

	beforeEach(() => {
		store = mockStore({
			articlesReducer: {
				'links': {
					'next': null,
					'previous': null
				},
				'count': 0,
				'article': {author: {username: 's'}, tagList: ['one']},
				'articleEdit': {},
				'results': [{author: {}, slug: 'one'}]
			}
		});
		localStorage.clear();
		moxios.stubRequest(API_URLS.FETCH_ALL_ARTICLES, {
			status: 200,
			response: {}
		});
	});

	it('should mount view all component', () => {
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ViewAll />
				</Provider>
			</MemoryRouter>
		);
	});

	it('should mount view article smaller component', () => {
		mount(<ViewArticleHeader article={{author: {}}} />);
		mount(<ViewArticleFooter authorName="san" deleteHandler={jest.fn} setEditorMode={jest.fn} tagList={['one']} />);
		localStorage.setItem(USERNAME_KEY, 'san');
		mount(<ViewArticleFooter authorName="san" deleteHandler={jest.fn} setEditorMode={jest.fn} tagList={['one']} />);
		mount(<ViewArticleSides article={{author: {}}} />);
		shallow(<ViewArticlePage setEditorMode={jest.fn} deleteHandler={jest.fn} data={{article: {author: {}}, editorMode: false}} />);

		const editor = mount(<ViewArticleBody article={{author: {}}} editorMode={false} />);
		editor.instance().onChange({}, jest.fn);
		editor.instance().func(jest.fn);
	});

	it('should mount view single article', () => {

		localStorage.setItem(USERNAME_KEY, 's');
		const art = {
			author: {username: 's'}, slug: 'ss',
			tagList: ['one']
		};

		wrapper = shallow(<ViewArticleTest match={{params: {slug: 'dsfds'}}} history={{push: jest.fn()}} dispatch={jest.fn} article={art} />);
	});

	it('should mount view single article with none in store', () => {

		store = mockStore({
			articlesReducer: {
				'links': {
					'next': null,
					'previous': null
				},
				'count': 0,
				'article': {},
				'articleEdit': {},
				'results': []
			}
		});
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ViewArticle />
				</Provider>
			</MemoryRouter>
		);
	});

	it('should display no footer buttons', () => {
		localStorage.setItem(USERNAME_KEY, 's');
		const art = {
			author: {username: 'sd'}, slug: 'ss',
			tagList: ['one']
		};

		wrapper = shallow(<ViewArticleTest match={{params: {slug: 'dsfds'}}} history={{push: jest.fn()}} dispatch={jest.fn} article={art} />);
	});

	it('should mount view all component', () => {
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ViewArticle />
				</Provider>
			</MemoryRouter>
		);

		store = mockStore({
			articlesReducer: {
				'links': {
					'next': null,
					'previous': null
				},
				'count': 0,
				'article': {},
				'articleEdit': {},
				'results': [{author: {}, slug: 'one'}]
			}
		});
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ViewArticle />
				</Provider>
			</MemoryRouter>
		);
	});

	it('should mount view all component', () => {
		const art = {author: {}, tagList: []};
		wrapper = mount(<ViewArticleTest match={{params: {slug: 'dsfds'}}} history={{push: jest.fn()}} dispatch={jest.fn} article={art} />);

		wrapper.setProps({article: {author: {}, tagList: []}});
		wrapper.instance().setEditorMode({});
		wrapper.instance().modalCallback();
		wrapper.instance().deleteHandler();
		wrapper.instance().loadArticles();
		wrapper.instance().loadOneArticle();
		wrapper.unmount();
	});

	it('should mount view all', () => {
		wrapper = mount(<ViewAllTest dispatch={store.dispatch} articles={{results: []}} />);

		wrapper.setProps({article: {author: {}, tagList: []}});
		wrapper.instance().loadAllArticles();
		wrapper.unmount();
	});
});
