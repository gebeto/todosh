import * as React from 'react';

import { useDocumentEvent } from '../../hooks/useDocumentEvent';
import { Autocomplete } from './Autocomplete';


export const TaskModal: React.FC<any> = React.forwardRef((props: any, inputRef: any) => {
	const wrapperRef = React.useRef(null);
	const [ value, setValue ] = React.useState("");

	const handleModalClose = React.useCallback(() => {
		inputRef.current.blur();
		props.handleClose();
		setTimeout(() => {
			setValue("");
		}, 300);
	}, []);

	const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const handleWrapperClick = React.useCallback((e: React.MouseEvent) => {
		if (e.target === wrapperRef.current) {
			handleModalClose();
		}
	}, []);
	
	const handleFormSubmit = React.useCallback((e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		props.onSubmit(value);
		handleModalClose();
		return false;
	}, [value]);

	const handleSubmitOldTask = React.useCallback((task: any) => {
		inputRef.current.blur();
		setTimeout(() => {
			props.onSubmitOldTask(task);
		}, 250);
		handleModalClose();
		return false;
	}, [value]);

	useDocumentEvent<KeyboardEvent>("keydown", (e) => {
		if (e.key === "Escape") {
			handleModalClose()
		}
	});

	return (
		<form
			ref={wrapperRef}
			onClick={handleWrapperClick}
			onSubmit={handleFormSubmit}
			className={`inputter ${props.transitionState}`}
		>
			<div className="inputter-input-wrapper">
				<input ref={inputRef} type="text" value={value} onChange={handleInputChange} />
				<Autocomplete onSelect={handleSubmitOldTask} value={value} />
			</div>
		</form>
	);
});
