import React from 'react';
import { shallow } from 'enzyme';
import $ from 'jquery';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ReportArticle } from '../../../containers/reportArticle';

const store = configureStore([thunk])({});

describe('Calling handlers on EditProfile', () => {
	let mountReportArticle;
	let instance;
	beforeEach(() => {
		mountReportArticle = shallow(
			<ReportArticle data={{articlesReducer: {article: {slug: {}}}}} dispatch={store.dispatch} />
		);
		instance = mountReportArticle.instance();

	});

	it('loads ReportArticleForm component', () => {
		const reportArticleForm = mountReportArticle.find('ReportArticleForm');
		expect(reportArticleForm.length).toBe(1);
	});

	it('should call handleSubmit method', () => {
		instance.handleSubmit({preventDefault: jest.fn});
	});

	it('should call handleChange method', () => {
		instance.handleChange({target: {value: 'It is  plagiarised content'}});
	});

	it('should call handleChange method', () => {
		$.fn.modal = jest.fn();
		instance.handleClick();
	});

});
