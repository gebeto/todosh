import { Story } from '@storybook/react';
import React from 'react';

import { Loader, LoaderProps } from './index';

export default {
	title: 'Components/Loader',
	component: Loader,
	argTypes: {
		size: {
			type: "number",
			control: {
				type: "range",
				min: 10,
				max: 200,
				step: 1,
			},
			
		},
	}
};


const Template: Story<LoaderProps> = (args) => (
	<Loader {...args} />
);


export const Base = Template.bind({});
Base.args = {
	size: 100,
};
