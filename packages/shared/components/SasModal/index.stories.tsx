import React from 'react';

import { Modal, ModalPosition } from './index';
import { List } from '../List';
import { Autocomplete } from '../Autocomplete';


export default {
	title: 'Components/SasModal',
	component: Modal,
	argTypes: {
		children: { control: false },
		open: { control: false },
		position: {
			defaultValue: ModalPosition.top,
			control: {
				type: "radio",
				options: ModalPosition,
			},
		},
		title: {
			defaultValue: "Header Title",
			control: {
				type: "text",
			},
		}
	}
};


const Template = (args: any) => {
	const [open, setOpen] = React.useState(false);

	return (
		<div>
			<Modal {...args} open={open} handleClose={() => setOpen(false)} />
			<button onClick={() => setOpen(true)}>Open</button>
		</div>
	);
}


export const Simple = Template.bind<any>({});
Simple.args = {
	children: (
		<div style={{padding: 30}}>Hello world!!!</div>
	)
};


export const WithTitle = Template.bind<any>({});
WithTitle.args = {
	title: "Hello world",
	children: (
		<div style={{padding: 30}}>Hello world!!!</div>
	)
};


export const WithList = Template.bind<any>({});
WithList.args = {
	title: "Hello world",
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



const Template2 = (args: any) => {
	const [open, setOpen] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleOpen = () => {
		setOpen(true);
		inputRef.current?.focus();
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<div>
			<Modal {...args} open={open} handleClose={handleClose}>
				<Autocomplete
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


export const WithAutocomplete = Template2.bind<any>({});
WithAutocomplete.args = {};
