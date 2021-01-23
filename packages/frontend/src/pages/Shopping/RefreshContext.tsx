import React from 'react';


export const RefreshContext = React.createContext(() => {});

export const useRefresh = () => {
	return React.useContext(RefreshContext);
}