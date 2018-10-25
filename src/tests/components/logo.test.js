import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../components/logo/logo';

describe('Logo', () => {
	it('renders without crashing', () => {
		shallow(<Logo />);
	});
});
