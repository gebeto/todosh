import React from 'react';

import { Autocomplete } from './index';

export default {
	title: 'Components/Autocomplete',
	component: Autocomplete,
	argTypes: {
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


const Template = (args) => (
	<div style={{border: '1px solid red'}}>
		<Autocomplete {...args} />
	</div>
);


export const Simple = Template.bind({});
Simple.args = {
	defaultValue: 'hello',
	items: [
		{ id: 1, title: "Hel" },
		{ id: 2, title: "Hello" },
		{ id: 3, title: "Hello World" },
		{ id: 4, title: "World" },
		{ id: 5, title: "Hello 1 World" },
		{ id: 6, title: "Hello 2 World" },
		{ id: 7, title: "Hello 3 World" },
		{ id: 8, title: "Hello 4 World" },
		{ id: 9, title: "Hello 5 World" },
	],
};
