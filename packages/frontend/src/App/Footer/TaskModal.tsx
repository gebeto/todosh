import * as React from 'react';
import * as ReactDOM from 'react-dom';


export const TaskModal = React.forwardRef((props: any, inputRef: any) => {
	const wrapperRef = React.useRef(null);

	const [ value, setValue ] = React.useState("");
	const handleInputChange = React.useCallback(e => setValue(e.target.value), []);

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

		
	return (
		<form
			onSubmit={handleFormSubmit}
			onClick={handleWrapperClick}
			ref={wrapperRef}
			className={`inputter ${props.transitionState}`}
		>
			<input
				ref={inputRef}
				type="text"
				className="input"
				value={value}
				onChange={handleInputChange}
			/>
		</form>
	);
});


// export default (props: any) => ReactDOM.createPortal(<TaskModal {...props} />, document.body);
export default TaskModal;
