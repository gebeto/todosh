import React from 'react';

import { List } from './index';

export default {
	title: 'Components/List',
	component: List,
	argTypes: {
		items: {
			type: "object",
			control: "object",
		},
	}
};


const Template = (args) => (
	<div style={{ border: '1px solid red' }}>
		<List {...args} />
	</div>
);


export const Simple = Template.bind({});
Simple.args = {
	items: [
		{ id: 1, title: "Hel" },
		{ id: 2, title: "Hello" },
		{ id: 3, title: "Hello World" },
		{ id: 4, title: "World" },
		{ id: 5, title: "Work" },
		{ id: 6, title: "Hello World" },
		{ id: 7, title: "Hello World" },
		{ id: 8, title: "Hello World" },
		{ id: 9, title: "Hello World" },
		{ id: 10, title: "Hello World" },
	],
};
