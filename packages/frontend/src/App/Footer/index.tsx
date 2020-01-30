import * as React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { WTask } from '../Wunderlist';
import { addNewTask } from '../store/tasks';
import TaskModal from './TaskModal/';

import { useTransition } from '../hooks';

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
		}
	})
)(CreateTask);
