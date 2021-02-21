import React from 'react';

import { TaskModal } from './index';

export default {
	title: 'Task Modal',
	component: TaskModal,
	argTypes: {
		items: {
			type: "object",
			control: "object",
		},
		transitionState: {
			type: "select",
			options: ["hello", "world"],
		}
	}
};

const items = [
	{id: 1, title: 'Hello'},
	{id: 2, title: 'World'},
	{id: 3, title: '!'},
];

const Template = (args) => <TaskModal items={items} {...args} />;


export const Simple = Template.bind({});
Simple.args = {
	items: items,
	transitionState: 'Hello',
};
