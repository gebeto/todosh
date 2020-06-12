import { Client } from '@microsoft/microsoft-graph-client';
import { AuthResponse } from 'msal';

import { ITask } from './ITask';


const getAuthenticatedClient = () => {
	const accessToken = localStorage.getItem('access_token');
	const client = Client.init({
		defaultVersion: 'beta',
		authProvider: (done) => {
			done(null, accessToken);
		}
	});
	return client;
}

export const getUserDetails = async () => {
	const client = getAuthenticatedClient();
	const user = await client.api('/me').get();
	return user;
}

export const getTaskFolders = async () => {
	const client = getAuthenticatedClient();
	const tasks = await client.api('/me/outlook/taskFolders').get();
	return tasks;
}

export const getTasks = async (folderId = "AQMkADAwATM3ZmYAZS0xNzQ5LTBjMzYtMDACLTAwCgAuAAADJZb0rY_RDES0Hj1NYJSo8wEALhRIhJvN6EaHTkQYs9qhUwABlWGG0QAAAA==", completed = false) => {
	const client = getAuthenticatedClient();
	const completedFilter = completed ? "&filter=status ne 'completed'" : "&filter=status ne 'uncompleted'";
	const tasks = await client.api(`/me/outlook/taskFolders/${folderId}/tasks?count=true&top=1000${completedFilter}`).get() as Promise<{
		["@odata.context"]: string;
		["@odata.count"]: number;
		value: ITask[];
	}>;
	return tasks;
}

export { ITask }