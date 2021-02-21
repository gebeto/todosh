import * as React from 'react';


export enum TransitionState {
	entering="entering",
	entered="entered",
	exiting="exiting",
	exited="exited",
}


export const useTransition = (initialState: any, isIn: boolean, timeout: number) => {
	const [ state, setState ] = React.useState(initialState);
	const [timeoutId, setTimeoutId] = React.useState(undefined);
	
	React.useEffect(() => {
		if (isIn === true) {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
				setTimeoutId(undefined)
			}
			setState(TransitionState.entering);
			setTimeout(() => {
				setState(TransitionState.entered);
			}, timeout);
		} else {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
				setTimeoutId(undefined)
			}
			setState(TransitionState.exiting);
			setTimeout(() => {
				setState(TransitionState.exited);
			}, timeout);
		}
	}, [isIn]);
	
	return state;
}
