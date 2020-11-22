import { Client } from '@microsoft/microsoft-graph-client';
import { Task, TasksList } from './entities';


const todoTaskListId = "AQMkADAwATM3ZmYAZS0xNzQ5LTBjMzYtMDACLTAwCgAuAAADJZb0rY_RDES0Hj1NYJSo8wEALhRIhJvN6EaHTkQYs9qhUwABlWGG0QAAAA==";


export class ToDoClient {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async getUserDetails() {
		const user = await this.client.api('/me')
			.get();
		return user;
	}

	async getLists() {
		const lists = await this.client.api('/me/todo/lists')
			.get() as Promise<{
				"@odata.context": string,
				value: TasksList[];
			}>;
		return lists;
	}

	async getTasks(folderId: string, completed?: boolean) {
		const tasks = await this.client.api(`/me/todo/lists/${folderId}/tasks`)
			.count(true)
			.top(1000)
			.filter(`status ${completed ? 'eq' : 'ne'} 'completed'`)
			.get() as Promise<{
				["@odata.context"]: string;
				["@odata.count"]: number;
				value: Task[];
			}>
		return tasks;
	}
	
	async completeTask(taskId: string) {
		const completion = await this.client.api(`/me/outlook/tasks/${taskId}`)
			.patch({ status: "completed" });
		return completion;
	}
	
	async uncompleteTask(taskId: string) {
		const completion = await this.client.api(`/me/outlook/tasks/${taskId}`)
			.patch({ status: "notStarted" });
		return completion;
	}
	
	async createTask(folderId: string, subject: string) {
		const task = await this.client.api(`/me/outlook/taskFolders/${folderId}/tasks`)
			.post({ subject: subject }) as Promise<Task>;
		return task;
	}
}
