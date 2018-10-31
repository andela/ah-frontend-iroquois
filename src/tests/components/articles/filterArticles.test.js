import React from 'react';
import {mount} from 'enzyme';
import {FilterArticlesTest} from '../../../containers/filterArticles';

let wrapper;

describe('filter Articles sxuit', () => {

	it('should render without crashing', () => {
		wrapper = mount(<FilterArticlesTest authors={[]} handleFilterSubmit={jest.fn} />);
		wrapper.instance().onChange({target: {name: 'g', value: 'kjh'}});
		wrapper.instance().handleSubmit({preventDefault: jest.fn});
		wrapper.setProps({});
		wrapper.setProps({authors: ['jhg']});
	});
});
