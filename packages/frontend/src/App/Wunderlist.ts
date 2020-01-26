enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface WUser {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  revision: number;
  type: string;
}

export interface WList {
  id: number;
  title: string;
  owner_type: string;
  owner_id: number;
  list_type: string;
  public: boolean;
  revision: number;
  created_at: Date;
  type: string;
}

export interface WTask {
  id: number;
  created_at: Date;
  created_by_id: number;
  created_by_request_id: string;
  completed: boolean;
  completed_at: Date;
  completed_by_id: number;
  starred: boolean;
  list_id: number;
  revision: number;
  title: string;
  type: string;
}



export class Wunderlist {
  headers: any;
  endpoint: string;

  constructor(config: any) {
    this.headers = {
      'X-Access-Token': config.access_token,
      'X-Client-ID': config.client_id,
      'Content-Type': 'application/json'
    }
    this.endpoint = 'https://a.wunderlist.com/api/v1/';
  }

  request<T>(url: string, method: RequestMethod = RequestMethod.GET, body?: any): Promise<T> {
    return fetch(this.endpoint + url, {
      method: method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then(res => res.json());
  }

  getLists() {
    return this.request<WList[]>('lists', RequestMethod.GET);
  }

  getList(listId: number) {
    return this.request<WList>(`lists/${listId}`, RequestMethod.GET);
  }

  createList(title: string) {
    return this.request("lists", RequestMethod.POST, {
      "title": title
    });
  }

  updateList(listId: number, revision: number, title: string) {
    return this.request(`lists/${listId}`, RequestMethod.PATCH, {
      "revision": revision,
      "title": title
    });
  }

  stateList(listId: number, revision: number, statePublic: any) {
    return this.request(`lists/${listId}`, RequestMethod.PATCH, {
      "revision": revision,
      "statePublic": statePublic
    });
  }

  deleteList(listId: number, revision: number) {
    let url = {
      url: this.endpoint + 'lists/' + listId + '?revision=' + revision,
      method: 'DELETE'
    }

    return this.request(`lists/${listId}?revision=${revision}`, RequestMethod.DELETE);
  }

  listUsers(listId: number) {
    return this.request<WUser[]>(`users`, RequestMethod.GET);
  }

  getTasks(id: number) {
    return this.request<WTask[]>(`tasks?list_id=${id}`, RequestMethod.GET);
  }

  getTasksForState(id: number, completed: boolean) {
    return this.request<WTask[]>(`tasks?list_id=${id}&completed=${completed}`, RequestMethod.GET);
  }

 //  getTask(id) {
 //    let url ={
 //      url: this.endpoint + 'tasks/' + id,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

  createTask(listId: number, title: string, isCompleted?: boolean, isStarred?: boolean, due_date?: Date) {
    return this.request("tasks", RequestMethod.POST, {
        "list_id": listId,
        "title": title,
        "completed": isCompleted,
        "starred": isStarred,
        "due_date": due_date
      });
    }

 //    return this.request(url);
 //  }

 //  deleteTask(id, revision) {
 //    let url = {
 //      url:  this.endpoint + 'tasks/' + id + '?revision=' + revision,
 //      method: 'DELETE'
 //    }

 //    return this.request(url);
 //  }

 //  user() {
 //    let url = {
 //      url:  this.endpoint + 'user',
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  avatar(userId, size, fallback) {
 //    let key = {
 //      headers: {
 //        'Content-Type': 'image/png'
 //      }
 //    }

 //    let url = {
 //      url:  this.endpoint + 'avatar?user_id=' + userId + '&size=' + size + '&fallback=' + fallback,
 //      method: 'GET'
 //    }

 //    const options = this._.extend(url, key);

 //    return this.promise(options);
 //  }

 //  getMembership() {
 //    let url = {
 //      url:  this.endpoint + 'memberships',
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  addMember(userId, listId, muted) {
 //    let url = {
 //      url:  this.endpoint + 'memberships',
 //      method: 'POST',
 //      json: {
 //        "list_id": listId,
 //        "user_id": userId,
 //        "muted": muted
 //      }
 //    }

 //    return this.request(url);
 //  }

 //  removeMember(userId, muted, revision) {
 //    let url = {
 //      url:  this.endpoint + 'memberships/' + userId,
 //      method: 'DELETE',
 //      json: {
 //        "revision": revision
 //      }
 //    }

 //    return this.request(url);
 //  }

 //  commentsList(listId) {
 //    let url =  {
 //      url:  this.endpoint + 'task_comments?list_id=' + listId,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  commentsTask(taskId) {
 //    let url = {
 //      url:  this.endpoint + 'task_comments?task_id=' + taskId,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  createComment(taskId, text) {
 //    let url = {
 //      url:  this.endpoint + 'task_comments',
 //      method: 'POST',
 //      json: {
 //        "task_id": taskId,
 //        "text": text
 //      }
 //    }

 //    return this.request(url);
 //  }

 //  subtaskList(listId) {
 //    let url = {
 //      url:  this.endpoint + 'subtasks?list_id=' + listId,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  subtaskComment(taskId) {
 //    let url = {
 //      url:  this.endpoint + 'subtasks?task_id=' + taskId,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  subtaskListState(listId, completed) {
 //    let url = {
 //      url:  this.endpoint + 'subtasks?list_id=' + listId + '&completed=' + completed,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  subtaskCommentState(taskId, completed) {
 //    let url = {
 //      url:  this.endpoint + 'subtasks?list_id=' + taskId + '&completed=' + completed,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  createSubstask(taskId, title, completed) {
 //    let url = {
 //      url:  this.endpoint + 'subtasks',
 //      method: 'POST',
 //      json: {
 //        "task_id": taskId,
 //        "title": title,
 //        "completed": completed
 //      }
 //    }

 //    return this.request(url);
 //  }

 //  deleteSubtask(subtaskId, revision) {
 //    let url = {
 //      url: this.endpoint + 'subtasks/' + subtaskId + '?revision=' + revision,
 //      method: 'DELETE'
 //    }

 //    return this.request(url);
 //  }

 //  notesList(listId) {
 //    let url = {
 //      url:  this.endpoint + 'notes?list_id=' + listId,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  notesTask(taskId) {
 //    let url = {
 //      url:  this.endpoint + 'notes?task_id=' + taskId,
 //      method: 'GET'
 //    }

 //    return this.request(url);
 //  }

 //  createNote(taskId, content) {
 //    let url = {
 //      url:  this.endpoint + 'notes',
 //      method: 'POST',
 //      json: {
	// "task_id": taskId,
 //        "content": content,
 //      }
 //    }

 //    return this.request(url);
 //  }

 //  deleteNote(noteId, revision) {
 //    let url =  {
 //      url: this.endpoint + 'notes/' + noteId + '?revision=' + revision,
 //      method: 'DELETE'
 //    }

 //    return this.request(url);
 //  }
}
