import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {shallow,mount} from 'enzyme';
import React from 'react';
import ViewComments from '../../../components/comments/viewComment';
import {CreateComments} from '../../../containers/createComment';
import ViewListComments from '../../../components/comments/viewListComments';
import renderer from 'react-test-renderer';
import {callThis} from '../../../actions/comments/commentActions';
import {USERNAME_KEY} from '../../../constants';

let wrapper;
const mockStore = configureStore([thunk]);
let store;
jest.mock('jquery');
jest.mock('react-notify-toast');

describe('Create Comments', () => {

	beforeEach(() => {
		store = mockStore({
			props: {
				handleChange:'handleChange',

			}
		});
		wrapper = shallow(
			<CreateComments slug={'hello'} dispatch={jest.fn}/>
		);
	});

	it('should test ViewComments component', () => {
		wrapper = mount(<ViewComments value={{}} handleChange={jest.fn} commentError={''} />);
	});

	it('should test createComponent component', () => {
		wrapper.setState({body: 'ghyughy'});
		wrapper.instance().handleSubmit({preventDefault: jest.fn});
		wrapper.instance().handleChange({target: {name: 'comment', value: 'fkj'}});
		wrapper.instance().handleCancel({preventDefault: jest.fn});
		wrapper.instance().validateCommenting({});
	});

	it('should test viewcomments component', () => {
		wrapper = mount(
			<ViewComments />
		);
	});

	it('should test viewListcomments component', () => {

		wrapper = shallow(
			<ViewListComments deleteComment='Success!'  editComment={jest.fn} comments={[]} handleChange={jest.fn} body={''} />
		);

		const tree = renderer.create(<ViewListComments deleteComment={jest.fn} comments={[]}  handleChange={jest.fn} body={''} />).toJSON();
		expect(tree).toMatchSnapshot();
		expect(wrapper.find('li')).toHaveLength(0)

		expect(wrapper.props().deleteComment).toEqual(undefined)
		expect(wrapper.props().editComment).toEqual(undefined)
	});

	it('calls editComment', () => {
		let editComment = jest.fn();
		let deleteComment = jest.fn();
		let openModalHandler =jest.fn();

		localStorage.setItem(USERNAME_KEY, 's');
		const comm = [{author:'s'}];
		wrapper = shallow(
			<ViewListComments deleteComment={deleteComment}
				  editComment={editComment}
							  openModalHandler={openModalHandler}
				  comments={comm} handleCancel={jest.fn}
							  handleSubmit={jest.fn}
				  handleChange={jest.fn} body={''}

			/>
		);


		wrapper.find('.delete_comment').simulate('click');
		expect(deleteComment).toHaveBeenCalled();

		wrapper.find('.edit_comment').simulate('click');

	});

	it('non-empty list looks good', () => {
		wrapper = shallow(
			<ViewListComments deleteComment='Success!'
				  editComment={jest.fn}
				  comments={[{},{}]}
				  handleChange={jest.fn} body={''}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('test async method', async () => {

		await expect(callThis(store.dispatch, "fgh", "dfgh")).resolves.toBeUndefined();

	});

});
