import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {mount} from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import CreateArticle, { CreateArticleTest } from '../../../containers/createArticle';
import {EditorCreate} from '../../../components/articles/editorCreate';

let wrapper;
const mockStore = configureStore([thunk]);
let store;

jest.mock('@ckeditor/ckeditor5-react');
jest.mock('@ckeditor/ckeditor5-build-decoupled-document');
jest.mock('jquery');

describe('Create Articles', () => {

	beforeEach(() => {
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
					<CreateArticle />
				</Provider>
			</MemoryRouter>
		);
	});

	it('should test creating article', () => {
		wrapper = mount(<EditorCreate handleEditorChange={jest.fn} />);
		wrapper.instance().func({ui: {view: {toolbar: {element: {}}, editable: {element: {parentElement: {insertBefore: jest.fn()}}}}}});
	});

	it('should test create methods', () => {
		wrapper = mount(<CreateArticleTest dispatch={store.dispatch} article={{title: '', description: ''}} />);
		wrapper.instance().handleSubmit({preventDefault: jest.fn});

		wrapper.setState({title: 'sfyrtdfgfsg', tags: [], body: 'kjhgfrertyuilkjhgfdsdfghjuklkjhgfdsdfg', description: 'sdfg'});
		wrapper.instance().handleSubmit({preventDefault: jest.fn});

	});

	it('should test no length descr', () => {
		wrapper = mount(<CreateArticleTest dispatch={store.dispatch} article={{title: '', description: ''}} />);
		wrapper.setState({title: 'ghy', tags: ['jgft'], description: 'hfjgk', slug: 'erth'});
		wrapper.instance().handleSubmit({preventDefault: jest.fn});
	});

	it('should test no length', () => {
		wrapper = mount(<CreateArticleTest dispatch={store.dispatch} article={{title: '', description: ''}} />);
		wrapper.setState({title: 'ghyughy', tags: ['jgft'], description: '', slug: 'erth'});
		wrapper.instance().handleSubmit({preventDefault: jest.fn});
	});

	it('should test no length', () => {
		wrapper = mount(<CreateArticleTest dispatch={store.dispatch} article={{title: '', description: ''}} />);
		wrapper.setState({title: 'ghyughy', tags: ['jgft'], description: 'sdfgtdrfg', slug: 'erth', body: 'esdjhgsdh bvcxSDFz gvcHBXCjnxzb'});
		wrapper.instance().handleSubmit({preventDefault: jest.fn});
	});

	it('should test all valid', () => {
		wrapper = mount(<CreateArticleTest dispatch={store.dispatch} article={{title: '', description: ''}} />);
		wrapper.setState({title: 'ghyughy', tags: ['jgft'], description: 'sdfgtdrfg', body: 'esdjhgsdh bvcxSDFz gvcHBXCjnxzb'});
		wrapper.instance().handleSubmit({preventDefault: jest.fn});
	});

	it('should test methods', () => {
		wrapper = mount(<CreateArticleTest dispatch={store.dispatch} article={{title: '', description: ''}} />);
		wrapper.instance().handleEditorChange({}, {getData: jest.fn});
		wrapper.instance().clearForm({});
		wrapper.instance().handleChange({target: {name: 'email', value: 'fkj'}});
		wrapper.instance().componentWillUnmount();
		wrapper.instance().onLoad({});
	});
});
