import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useTransition } from '../hooks';



function focusAndOpenKeyboard(el: HTMLInputElement, timeout: number) {
	var __tempEl__: HTMLInputElement = document.createElement('input') as HTMLInputElement;
	// __tempEl__.style.position = 'absolute';
	// __tempEl__.style.top = (el.offsetTop + 7) + 'px';
	// __tempEl__.style.left = el.offsetLeft + 'px';
	// __tempEl__.style.height = '0';
	// __tempEl__.style.opacity = '0';
	document.body.appendChild(__tempEl__);
	__tempEl__.focus();
	setTimeout(function() {
		el.focus();
		el.click();
		// document.body.removeChild(__tempEl__);
	}, timeout);
}


export const TaskModal = (props: any) => {
	const transitionState = useTransition(props.isOpened, 500);

	const wrapperRef = React.useRef(null);
	const inputRef = React.useRef(null);

	const handleWrapperClick = React.useCallback((e) => {
		if (e.target === wrapperRef.current) {
			props.handleClose(e);
		}
	}, [])
	
	const handleFormSubmit = React.useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		(inputRef.current as unknown as HTMLInputElement).blur();
		props.onSubmit((inputRef.current as unknown as HTMLInputElement).value);
		props.handleClose();
		return false;
	}, [])
	
	React.useEffect(() => {
		console.log('UPDA', props.isOpened);
		if (props.isOpened === true) {
			// focusAndOpenKeyboard((inputRef.current as unknown as HTMLInputElement), 600); 
			console.log(inputRef.current)
			// setTimeout(() => {
			// 	inputRef.current.focus()
			// 	inputRef.current.click()
			// }, 1000);
			// inputRef.current.focus();
		}
	}, [props.isOpened]);
		
	return (
		<form
			onSubmit={handleFormSubmit}
			onClick={handleWrapperClick}
			ref={wrapperRef}
			className={`inputter ${transitionState}`}
		>
			<input type="text" ref={inputRef} />
		</form>
	);
}


export default (props) => ReactDOM.createPortal(<TaskModal {...props} />, document.body);
