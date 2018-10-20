import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../components/landingPage/landingPage';

describe('LandingPage', () => {
	let mountedLandingPage;
	beforeEach(() => {
		mountedLandingPage = shallow(<LandingPage />);
	});

	it('renders without crashing', () => {
		shallow(<LandingPage />);
	});

	it('loads a footer component', () => {
		const footer = mountedLandingPage.find('Footer');
		expect(footer.length).toBe(1);
	});

	it('displays a slogan', () => {
		const slogan = 'A Social platform for the creative at heart';
		const footer = mountedLandingPage.find('.slogan');
		expect(footer.text()).toEqual(slogan);
	});
});
