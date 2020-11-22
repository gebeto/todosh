import * as React from "react";

import { ToDoClient } from "../../api";
import { useGraphClientContext } from './MSALContext';


const ToDoClientContext = React.createContext<ToDoClient | undefined>(undefined);

export const useToDoClient = () => React.useContext(ToDoClientContext);

export const ToDoClientProvider: React.FC<any> = ({ children }) => {
	const client = useGraphClientContext();

	const toDoClient = React.useMemo(() => {
		if (!client) return undefined;
		return new ToDoClient(client);
	}, [client]);

	return (
		<ToDoClientContext.Provider value={toDoClient}>
				{children}
			</ToDoClientContext.Provider>
	);
}
