import React from 'react';

import { Autocomplete, AutocompleteItem } from './index';

export default {
	title: 'Autocomplete',
	component: Autocomplete,
	// argTypes: {
	// 	// backgroundColor: { control: 'color' },
	// },
};

const items = [
	{id: 1, title: 'Hello'},
	{id: 2, title: 'World'},
];

const Template = (args) => <Autocomplete items={items} {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	data: {
		title: "Hello",
	}
};

export const Secondary = Template.bind({});
Secondary.args = {
	data: {
		title: "World",
	}
};
