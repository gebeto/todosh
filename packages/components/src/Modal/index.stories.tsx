import React from 'react';

import { Modal } from './index';
import { List } from '../List';
import { AutocompleteTask } from '../AutocompleteForm';


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


export const Simple = Template.bind({});
Simple.args = {
	children: (
		<div style={{padding: 30}}>Hello world!!!</div>
	)
};


export const WithList = Template.bind({});
WithList.args = {
	children: (
		<List
			onItemSelect={console.log}
			items={[
				{id: 1, title: "hello"},
				{id: 2, title: "hello wo"},
				{id: 3, title: "hello world"},
			]}
		/>
	)
};



const Template2 = (args) => {
	const [open, setOpen] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleOpen = () => {
		setOpen(true);
		inputRef.current.focus();
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<div>
			<Modal {...args} open={open} handleClose={handleClose}>
				<AutocompleteTask
					inputRef={inputRef}
					defaultValue="hello"
					items={[
						{ id: 1, title: "Hel" },
						{ id: 2, title: "Hello" },
						{ id: 3, title: "Hello World" },
						{ id: 4, title: "World" },
						{ id: 5, title: "Work" },
					]}
				/>
			</Modal>
			<button onClick={handleOpen}>Open</button>
		</div>
	);
}


export const WithAutocomplete = Template2.bind({});
WithAutocomplete.args = {};
