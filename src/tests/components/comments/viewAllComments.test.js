import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {shallow,mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import $ from 'jquery'
import ViewAllComments, {ViewAllCommentsTest} from '../../../containers/viewAllComments';

jest.mock('react-notify-toast');
let wrapper;
const mockStore = configureStore([thunk]);
let store;

window.MaterialDialog.dialog = jest.fn();

describe('Get All Comments', () => {

	beforeEach(() => {
		store = mockStore({
			props: {
				handleChange:'handleChange',

			}
		});

		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ViewAllComments  article={{comments:[]}} slug={'slug'} created_at={'23'}/>
				</Provider>
			</MemoryRouter>
		);
	});


	it('should test ViewAllComments component 2', () => {
		wrapper = shallow(
					<ViewAllCommentsTest  article={{comments:[]}} slug={'slug'} created_at={'23'} dispatch={jest.fn}/>
		);

		wrapper.instance().clearHandler({preventDefault: jest.fn});
		wrapper.instance().editComment({preventDefault: jest.fn});
		wrapper.instance().modalCallback();
		wrapper.instance().modalCallEdit();
		wrapper.instance().handleChange({target: {name: 'comment', value: 'fkj'}});
		wrapper.instance().deleteComment();
		$.fn.modal = jest.fn();
		wrapper.instance().openModalHandler();

	});

});
