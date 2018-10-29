import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom';
import Profile from '../../../containers/profile/profile';
import ProfileInformation from '../../../components/profile/profileInformation';

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

});
