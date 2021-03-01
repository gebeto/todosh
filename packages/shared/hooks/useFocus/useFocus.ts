import React from 'react';


export const useFocus = <T extends HTMLElement>() => {
	const htmlElRef = React.useRef<T>(null);

	const setFocus = () => {
		htmlElRef.current?.focus();
	};

	return [htmlElRef, setFocus] as [typeof htmlElRef, typeof setFocus];
}
