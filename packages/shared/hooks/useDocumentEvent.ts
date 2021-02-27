import React from 'react';


export const useDocumentEvent = (eventType: keyof DocumentEventMap, callback: (e: DocumentEvent) => void) => {
	React.useEffect(() => {
		const handleCallback = (e: DocumentEvent) => {
			callback(e);
		}
		
		document.addEventListener(eventType, handleCallback as any);
		
		return () => {
			document.removeEventListener(eventType, handleCallback as any);
		}
	}, []);
}
