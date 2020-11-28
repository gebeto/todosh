export type ISOString = string;


export type TaskBody = {
	content: any;
	contentType: "html" | "json" | "text",
}


export type TaskId = string;


export type Task = {
	"@odata.etag": TaskId;
	id: string;
	importance: "normal" | "high";
	isReminderOn: boolean;
	status: "notStarted" | "started";
	title: string;
	createdDateTime: ISOString;
	lastModifiedDateTime: ISOString;
	body: TaskBody;
	newlyAdded?: boolean;
}

export type TasksList = {
	"@odata.etag": string;
	id: string;
	displayName: string;
	isOwner: boolean;
	isShared: boolean;
	wellknownListName: "defaultList" | "none";
}

// export type Task = {
// 	"@odata.etag": string;
// 	assignedTo: string;
// 	body: TaskBody;
// 	categories: any[];
// 	changeKey: string;
// 	completedDateTime: ISOString | null;
// 	createdDateTime: ISOString;
// 	dueDateTime: ISOString;
// 	hasAttachments: boolean;
// 	id: string;
// 	importance: "normal" | "high";
// 	isReminderOn: boolean;
// 	lastModifiedDateTime: ISOString;
// 	owner: string;
// 	parentFolderId: string;
// 	recurrence: null;
// 	reminderDateTime: ISOString | null;
// 	sensitivity: "normal" | "high";
// 	startDateTime: ISOString | null;
// 	status: "notStarted" | "started" | "completed";
// 	subject: string;
// }
