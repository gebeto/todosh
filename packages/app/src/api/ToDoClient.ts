import { Client } from '@microsoft/microsoft-graph-client';
import { Task, TasksList } from './entities';


export const DEFAULTL = "AQMkADAwATM3ZmYAZS0xNzQ5LTBjMzYtMDACLTAwCgAuAAADJZb0rY_RDES0Hj1NYJSo8wEALhRIhJvN6EaHTkQYs9qhUwABlWGG0QAAAA==";


export class ToDoClient {
	public client: Client;
	public todoTaskListId: string;
	public todoTaskListTitle?: string;

	constructor(client: Client) {
		this.client = client;
		this.todoTaskListId = localStorage.getItem("LIST_ID") || DEFAULTL;
		this.todoTaskListTitle = localStorage.getItem("LIST_TITLE") || undefined;
	}

	setTodoTaskListId(newId: string, title?: string) {
		localStorage.setItem("LIST_ID", newId);
		title && localStorage.setItem("LIST_TITLE", title);
		this.todoTaskListId = newId;
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

	async getTasks(completed?: boolean) {
		const tasks = await this.client.api(`/me/todo/lists/${this.todoTaskListId}/tasks`)
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
		const completion = await this.client.api(`/me/todo/lists/${this.todoTaskListId}/tasks/${taskId}`)
			.patch({ status: "completed" });
		return completion;
	}
	
	async uncompleteTask(taskId: string) {
		const completion = await this.client.api(`/me/todo/lists/${this.todoTaskListId}/tasks/${taskId}`)
			.patch({ status: "notStarted" });
		return completion;
	}
	
	async createTask(folderId: string, text: string) {
		const task = await this.client.api(`/me/todo/lists/${folderId}/tasks`)
			.post({ title: text }) as Promise<Task>;
		return task;
	}
}
