import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Dropdown from '../../components/navigation/generateDropdownItems';

describe('GenerateDropdown', () => {

	it('renders without crashing', () => {
		mount(
			<MemoryRouter>
				<Dropdown />
			</MemoryRouter>
		);
	});
});
