import { Story } from '@storybook/react';
import React from 'react';

import { FloatBottomBar, FloatBottomBarProps } from './index';

export default {
    title: 'Components/FloatBottomBar',
    component: FloatBottomBar,
};


const Template: Story<FloatBottomBarProps> = (args) => (
    <FloatBottomBar {...args} />
);


export const Simple = Template.bind({});
Simple.args = {
    onClick: console.log,
    label: "Hello world",
};
