import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../../components/Footer/Footer';

describe('Footer', () => {
	let mountedFooter;
	beforeEach(() => {
		mountedFooter = shallow(<Footer />);
	});

	it('renders without crashing', () => {
		shallow(<Footer />);
	});

	it('renders a footer', () => {
		const footer = mountedFooter.find('footer');
		expect(footer.length).toBe(1);
	});

	it('shows a footer copyright', () => {
		const footerCopyright = mountedFooter.find('.footer-copyright');
		expect(footerCopyright.length).toBe(1);
	});
});
