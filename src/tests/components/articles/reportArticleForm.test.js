import React from 'react';
import { shallow } from 'enzyme';
import ReportArticleForm from '../../../components/articles/reportArticleForm';

describe('ReportArticleForm', () => {

	let mountReportArticleForm;
	const func = jest.fn();
	const issue = {
		issue: ''
	};
	beforeEach(() => {
		mountReportArticleForm = shallow(
			<ReportArticleForm
				issue={issue}
				handleChange={func}
				handleSubmit={func}
				handleClick={func}
			/>
		);

	});

	it('loads the report form', () => {
		const reportForm = mountReportArticleForm.find('.report_form');
		expect(reportForm.length).toBe(1);
	});

	it('calls handleSubmit method', () => {
		mountReportArticleForm.find('form').simulate('submit');
		expect(func).toHaveBeenCalled();
	});

	it('calls handleClick method', () => {
		mountReportArticleForm.find('button').simulate('click');
		expect(func).toHaveBeenCalled();
	});

});
