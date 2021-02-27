import React from 'react';


export const useDocumentEvent = <T>(eventType: string, callback: (e: T) => void) => {
	React.useEffect(() => {
		const handleCallback = (e: T) => {
			callback(e);
		}
		
		document.addEventListener(eventType, handleCallback as any);
		
		return () => {
			document.removeEventListener(eventType, handleCallback as any);
		}
	}, []);
}
