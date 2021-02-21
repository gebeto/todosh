import React from 'react';

import { TaskModal } from './index';

export default {
	title: 'Task Modal',
	component: TaskModal,
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


const Template = (args) => <TaskModal {...args} />;


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
