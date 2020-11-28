import React from 'react';


export const useFocus = () => {
	const htmlElRef = React.useRef(null)
	const setFocus = () => { htmlElRef.current && (htmlElRef.current as any).focus() }

	return [htmlElRef, setFocus];
}
