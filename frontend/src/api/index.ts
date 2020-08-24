import { Client } from '@microsoft/microsoft-graph-client';
import { AuthResponse } from 'msal';

import { ITask } from './ITask';

import store from '../store/';

(window as any).microsoft = {
	Client: Client,
}


const getAuthenticatedClient = () => {
	// const accessToken = localStorage.getItem('access_token');
	// const accessToken = store.getState().user.jwtIdToken;
	const accessToken = localStorage.getItem('__accesstoken');
	console.log("TOKEN", accessToken)
	const client = Client.init({
		defaultVersion: 'beta',
		authProvider: (done) => {
			// console.log(done);
			done(null, accessToken);
		}
	});
	console.log(client);
	(window as any).CLIENT = client;
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

const defaultFolder = "AQMkADAwATM3ZmYAZS0xNzQ5LTBjMzYtMDACLTAwCgAuAAADJZb0rY_RDES0Hj1NYJSo8wEALhRIhJvN6EaHTkQYs9qhUwABlWGG0QAAAA==";
export const getTasks = async (folderId = defaultFolder, completed = false) => {
	const client = getAuthenticatedClient();
	const completedFilter = completed ? "" : "&filter=status ne 'completed'";
	const tasks = await client.api(`/me/outlook/taskFolders/${folderId}/tasks?count=true&top=1000${completedFilter}`).get() as Promise<{
		["@odata.context"]: string;
		["@odata.count"]: number;
		value: ITask[];
	}>;
	return tasks;
}

export const completeTask = async (taskId: string) => {
	const client = getAuthenticatedClient();
	const completion = await client.api(`/me/outlook/tasks/${taskId}`).patch({ status: "completed" });
	return completion;
}

export const uncompleteTask = async (taskId: string) => {
	const client = getAuthenticatedClient();
	const completion = await client.api(`/me/outlook/tasks/${taskId}`).patch({ status: "notStarted" });
	return completion;
}

export const createTask = async (subject: string, folderId = defaultFolder) => {
	const client = getAuthenticatedClient();
	// const task = await client.api(`/me/outlook/tasks`).post({ subject: subject });
	const task = await client.api(`/me/outlook/taskFolders/${folderId}/tasks`).post({ subject: subject });
	return task;
}

export { ITask }