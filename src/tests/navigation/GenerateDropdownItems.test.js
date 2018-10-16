import React from 'react';
import {mount} from 'enzyme';
import Dropdown from '../../components/navigation/GenerateDropdownItems';
import {MemoryRouter} from 'react-router-dom';

describe('GenerateDropdown', () => {

	it('renders without crashing', () => {
		mount(
			<MemoryRouter>
				<Dropdown />
			</MemoryRouter>
		);
	});
});
