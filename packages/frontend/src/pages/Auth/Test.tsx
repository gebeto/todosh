import React from 'react';
import { useToDoClient } from './ToDoClientContext';


export const Test: React.FC<any> = () => {
	const client = useToDoClient();
	const [todoTaskListId, setTodoTaskListId] = React.useState<string>();
	const [tasks, setTasks] = React.useState<any[]>([]);
	const [lists, setLists] = React.useState<any[]>([]);

	React.useEffect(() => {
		if (!client || !todoTaskListId) return;
		client.getTasks(todoTaskListId, false).then(res => {
			setTasks(res.value);
		});
	}, [todoTaskListId]);

	React.useEffect(() => {
		if (!client) return;
		client.getLists().then(res => {
			console.log(res);
			setLists(res.value);
		})
	}, []);

	return (
		<pre>
			{lists.map((list: any) =>
				<div key={list.id}>
					<label>
						<input type="radio" name="list" value={list.id} onChange={(e: any) => setTodoTaskListId(e.target.value)} />
						{list.displayName}
					</label>
				</div>
			)}

			<h3>tasks</h3>
			<ul>
				{tasks.map((task: any) =>
					<li key={task.id}>{task.title}</li>
				)}
			</ul>

			{JSON.stringify(tasks, null, 2)}
		</pre>
	);
}
