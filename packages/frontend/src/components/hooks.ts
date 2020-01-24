import * as React from 'react';


export const useTransition = (initialState, isIn, timeout) => {
	const [ state, setState ] = React.useState(initialState);
	const [timeoutId, setTimeoutId] = React.useState(undefined);
	
	React.useEffect(() => {
		if (isIn === true) {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
				setTimeoutId(undefined)
			}
			setState("entering");
			setTimeout(() => {
				setState("entered");
			}, timeout);
		} else {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
				setTimeoutId(undefined)
			}
			setState("exiting");
			setTimeout(() => {
				setState("exited");
			}, timeout);
		}
	}, [isIn]);
	
	return state;
}
