/* eslint-disable import/no-named-as-default */
import React from 'react';
import { mount, shallow } from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom';
import EditProfile, {EditProfile as EditProfileTest} from '../../../containers/profile/editProfile';
import ProfileForm from '../../../components/profile/profileForm';

const store = configureStore([thunk])({});

describe('EditProfile', () => {
	it('renders without crashing', () => {
		mount(
			<MemoryRouter>
				<Provider store={store}>
					<EditProfile data={{profileInfo: {}}} dispatch={store.dispatch} />
				</Provider>
			</MemoryRouter>
		);
	});
});

describe('Calling handlers on EditProfile', () => {
	let component;
	let instance;
	beforeEach(() => {
		component = shallow(
			<EditProfileTest data={{profileInfo: {}}} dispatch={store.dispatch} />
		);
		instance = component.instance();

	});

	it('loads ProfileForm component', () => {
		const profileForm = component.find('ProfileForm');
		expect(profileForm.length).toBe(1);
	});

	it('should call handleSubmit method', () => {
		instance.handleSubmit({preventDefault: jest.fn});
	});

	it('should call handleChange method', () => {
		instance.handleChange({target: {name: 'userName', value: 'patrick'}});
	});

	it('should receive props', () => {
		const data = {
			data: {profileInfo: {
				userName: 'patrickcolline',
				firstName: 'colline',
				lastName: 'patrick',
				bio: ''
			}}
		};
		instance.componentWillReceiveProps(data);
		expect(instance.state.userName).toEqual('patrickcolline');
		expect(instance.state.firstName).toEqual('colline');
		expect(instance.state.lastName).toEqual('patrick');
		expect(instance.state.bio).toEqual('');
	});

});

describe('ProfileForm', () => {
	let mountProfileForm;
	const fun = jest.fn();
	const profile = {
		firstName: 'colline',
		lastName: 'Patrick',
		userName: 'colPatrick',
		bio: 'This is our bio'
	};
	beforeEach(() => {
		mountProfileForm = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ProfileForm
						profile={profile}
						handleSubmit={fun}
						handleChange={fun}
					/>
				</Provider>
			</MemoryRouter>
		);
	});

	it('loads without crashing', () => {
		mount(
			<MemoryRouter>
				<Provider store={store}>
					<ProfileForm
						profile={profile}
						handleSubmit={fun}
						handleChange={fun}
					/>
				</Provider>
			</MemoryRouter>
		);
	});

	it('calls onSubmit method', () => {
		mountProfileForm.find('form').simulate('submit');
		expect(fun).toHaveBeenCalled();
	});

	it('calls onChange method', () => {
		mountProfileForm.find('input#userName').simulate('change');
		expect(fun).toHaveBeenCalled();
		expect(fun.mock.calls.length).toEqual(1);
	});

});

describe('ProfileForm when some user details are not defined', () => {
	const fun = jest.fn();
	it('loads without crashing', () => {
		mount(
			<MemoryRouter>
				<Provider store={store}>
					<ProfileForm
						profile={{}}
						handleSubmit={fun}
						handleChange={fun}
					/>
				</Provider>
			</MemoryRouter>
		);
	});
});
