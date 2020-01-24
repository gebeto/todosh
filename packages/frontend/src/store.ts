import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const initialState = {
	tasks: [],
};



export const addNewTask = (taskText) => (dispatch) => {
	const task = {
		id: Math.round(Math.random() * 100000),
		created_at: (new Date()).toISOString(),
		created_by_id: 85720434,
		// created_by_request_id: "d46c6d8d45e73a232c56:E284FE35-A9B8-42D5-9278-A864B47F584C:96770FBB-5E73-44BB-B6B6-5AFB38177835:85720434:1CFFB5AC-D16A-4E5E-BB49-FD67BAB5FBE2",
		completed: false,
		starred: false,
		list_id: 365103446,
		revision: 2,
		title: taskText,
		type: "task",
	};
	dispatch({ type: "ADD_TASK", payload: task });
}


const reducer = (state = initialState, { type, payload }: any) => {
	console.log("STORE", state);
	if (type === "SET_TASKS") {
		return {
			...state,
			tasks: payload,
		}
	} else if (type === "ADD_TASK") {
		console.log(state, payload)
		return {
			...state,
			tasks: [...state.tasks, payload],
		}
	}
	return state;
}


export default createStore(reducer, applyMiddleware(thunk));