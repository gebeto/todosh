import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Autocomplete } from './autocomplete';


export const TaskModal = React.forwardRef((props: any, inputRef: any) => {
	const wrapperRef = React.useRef(null);

	const [ value, setValue ] = React.useState("");
	const handleInputChange = React.useCallback(e => {
		setValue(e.target.value)
	}, []);

	const handleWrapperClick = React.useCallback((e) => {
		if (e.target === wrapperRef.current) {
			props.handleClose(e);
		}
	}, [])
	
	const handleFormSubmit = React.useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		inputRef.current.blur();
		props.onSubmit(value);
		props.handleClose();
		setTimeout(() => {
			setValue("");
		}, 300);
		return false;
	}, [value]);

	const handleSubmitOldTask = React.useCallback((task: any) => {
		inputRef.current.blur();
		props.onSubmitOldTask(task);
		props.handleClose();
		setTimeout(() => {
			setValue("");
		}, 300);
		return false;
	}, [value]);
		
	return (
		<form
			onSubmit={handleFormSubmit}
			onClick={handleWrapperClick}
			ref={wrapperRef}
			className={`inputter ${props.transitionState}`}
		>
			<div className="inputter-input-wrapper">
				<input
					ref={inputRef}
					type="text"
					value={value}
					onChange={handleInputChange}
				/>
				<Autocomplete onSelect={handleSubmitOldTask} value={value} />
			</div>
		</form>
	);
});


export default TaskModal;
