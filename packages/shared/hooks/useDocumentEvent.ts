import React from 'react';


export const useDocumentEvent = <K extends keyof DocumentEventMap>(eventType: K, callback: (e: DocumentEventMap[K]) => void) => {
	React.useEffect(() => {
		document.addEventListener(eventType, callback);
		
		return () => {
			document.removeEventListener(eventType, callback);
		}
	}, []);
}
