import React from 'react';

import { Autocomplete } from './index';


export default {
	title: 'Autocomplete List',
	component: Autocomplete,
	argTypes: {
	}
};


const Template = (args) => <Autocomplete {...args} />;


export const Simple = Template.bind({},);
Simple.args = {
	value: 'Hel',
	items: [
		{ id: 1, title: "Hello" },
		{ id: 2, title: "Hel" },
		{ id: 3, title: "World Hello" },
		{ id: 4, title: "Hello World" },
	],
};
