import { createStore } from 'redux';


const initialState = {
	tasks: [],
};


const reducer = (state = initialState, { type, payload }: any) => {
	console.log("STORE");
	if (type === "SET_TASKS") {
		return {
			...state,
			tasks: payload,
		}
	}
	return state;
}


export default createStore(reducer);