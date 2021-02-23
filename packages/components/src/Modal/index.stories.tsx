import React from 'react';

import { Modal } from './index';


export default {
	title: 'Modal',
	component: Modal,
	argTypes: {
		children: { control: false },
		open: { control: false },
	}
};


const Template = (args) => {
	const [open, setOpen] = React.useState(false);

	return (
		<div>
			<Modal {...args} open={open} handleClose={() => setOpen(false)} />
			<button onClick={() => setOpen(true)}>Open</button>
		</div>
	);
}


export const Simple = Template.bind({}, );
Simple.args = {
	children: (
		<div style={{padding: 30}}>Hello world!!!</div>
	)
};
