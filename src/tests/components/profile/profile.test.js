import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import $ from 'jquery';
import {MemoryRouter} from 'react-router-dom';
import ProfileInformation from '../../../components/profile/profileInformation';
import Profile, {ProfileTest} from '../../../containers/profile/profile';

const store = configureStore([thunk])({});

describe('Profile', () => {
	it('loads ProfileInformation component', () => {
		const mountProfile = mount(
			<MemoryRouter>
				<Provider store={store}>
					<Profile />
				</Provider>
			</MemoryRouter>
		);

		const profileInformation = mountProfile.find('ProfileInformation');
		expect(profileInformation.length).toBe(1);
	});
});

describe('ProfileInformation', () => {
	$.fn.tabs = jest.fn();
	it('loads user profile information', () => {
		const mountProfileInformation = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ProfileInformation />
				</Provider>
			</MemoryRouter>
		);

		const profileContainer = mountProfileInformation.find('.profileData');
		expect(profileContainer.length).toBe(1);
	});

	it('loads updated user profile image', () => {
		$.fn.tabs = jest.fn();
		const profileData = {
			userName: 'copa',
			firstName: 'co',
			lastName: 'pa',
			bio: 'this is my bio',
			avatar: 'https://myupdatedImageIsHere'
		};
		const mountProfileInformation = mount(
			<MemoryRouter>
				<Provider store={store}>
					<ProfileInformation {...profileData} />
				</Provider>
			</MemoryRouter>
		);
		const userImage = mountProfileInformation.find('img').prop('src');
		expect(userImage).toEqual(profileData.avatar);
	});

	it('should handle change', () => {
		$.fn.tabs = jest.fn();
		const wrapper = shallow(<ProfileTest data={{profileInfo: {}}} match={{params: {username: 's'}}} dispatch={jest.fn} />);
		wrapper.setProps({match: {params: {username: ''}}});
		wrapper.setProps({match: {params: {username: 's'}}});
		wrapper.setProps({});
		wrapper.instance().handleChange({target: {name: '', value: ''}}, '');
	});

});
