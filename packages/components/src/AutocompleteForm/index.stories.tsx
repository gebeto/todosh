import React from 'react';

import { AutocompleteTask } from './index';

export default {
	title: 'Autocomplete Task',
	component: AutocompleteTask,
	argTypes: {
		className: {
			type: "string",
		},
		items: {
			type: "object",
			control: "object",
		},
		inputRef: {
			title: "Hello",
			control: false,
		}
	}
};


const Template = (args) => <AutocompleteTask {...args} />;


export const Simple = Template.bind({});
Simple.args = {
	defaultValue: 'hello',
	items: [
		{ id: 1, title: "Hel" },
		{ id: 2, title: "Hello" },
		{ id: 3, title: "Hello World" },
		{ id: 4, title: "World" },
		{ id: 5, title: "Work" },
	],
};
