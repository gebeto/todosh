import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useTransition } from '../hooks';


export const TaskModal = (props) => {
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
		inputRef.current.blur();
		props.onSubmit(inputRef.current.value);
		props.handleClose();
		return false;
	}, [])
	
	React.useEffect(() => {
		console.log('UPDA', props.isOpened);
		if (props.isOpened === true) {
			inputRef.current.focus();
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
