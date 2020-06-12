export interface ITaskBody {
	contentType: "html" | "json" | "text",
	content: any;
}

export interface ITask {
	["@odata.etag"]: string;
	assignedTo: string;
	body: ITaskBody;
	categories: any[];
	changeKey: string;
	completedDateTime: string;
	createdDateTime: string;
	dueDateTime: string;
	hasAttachments: boolean;
	id: string;
	importance: "normal" | "high";
	isReminderOn: boolean;
	lastModifiedDateTime: string;
	owner: string;
	parentFolderId: string;
	recurrence: null;
	reminderDateTime: null;
	sensitivity: "normal" | "high";
	startDateTime: string;
	status: "notStarted" | "started";
	subject: string;
}