import React from 'react';


export const useDocumentEvent = <T>(eventType: string, callback: (e: T) => void) => {
	React.useEffect(() => {
		const handleCallback = (e: T) => {
			callback(e);
		}
		
		document.addEventListener(eventType as any, handleCallback);
		
		return () => {
			document.removeEventListener(eventType as any, handleCallback);
		}
	}, []);
}
