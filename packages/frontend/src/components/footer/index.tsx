import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { addNewTask, addOldTask } from '../../store/tasks';
import { tasksCompleted } from '../../store/tasks-completed';
import TaskModal from '../task-modal/';

import { useTransition } from '../../hooks/use-transition';

const useFocus = () => {
	const htmlElRef = React.useRef(null)
	const setFocus = () => {htmlElRef.current &&  (htmlElRef.current as any).focus()}

	return [ htmlElRef,  setFocus ];
}


interface CreateTaskProps {
}


const CreateTask = (props: any) => {
	const [ isOpened, setIsOpened ] = React.useState(false);

	const transitionState = useTransition("exited", isOpened, 500);
	const [ ref, setFocus ] = useFocus() as any;

	const handleOpen = React.useCallback(() => {
		setIsOpened(true);
		setFocus();
	}, [])

	const handleClose = React.useCallback(() => {
		setIsOpened(false);
	}, [])

	return (
		<React.Fragment>
			<div className="create-task">
				<div className="container">
					<div onClick={handleOpen} className="create-task-input">Add item to list</div>
				</div>
			</div>
			<TaskModal
				transitionState={transitionState}
				onSubmit={props.handleSubmitItem}
				onSubmitOldTask={props.handleSubmitOldItem}
				handleClose={handleClose}
				ref={ref}
			/>
		</React.Fragment>
	)
}


export default connect(
	(state: any) => ({

	}),
	(dispatch: any) => ({
		handleSubmitItem(itemText: string) {
			dispatch(addNewTask(itemText))
		},
		handleSubmitOldItem(task: any) {
			try {
				dispatch(addOldTask({
					...task,
					completedDateTime: null,
				}));
			} catch(e) {}
			dispatch(tasksCompleted.actions.deleted(task.id));
		}
	})
)(CreateTask);
