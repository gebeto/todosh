import React from 'react';

import { Autocomplete } from './index';


export default {
	title: 'Components/Autocomplete List',
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
		{ id: 5, title: "Hello World" },
		{ id: 6, title: "Hello World" },
		{ id: 7, title: "Hello World" },
		{ id: 8, title: "Hello World" },
		{ id: 9, title: "Hello World" },
		{ id: 10, title: "Hello World" },
	],
};
