import * as React from 'react';

import { Autocomplete } from '../Autocomplete';
import { TransitionState } from '@wsl/frontend/src/hooks/useTransition';

import './styles.scss';


export type TaskModalProps = {
	items: Array<{id: number, title: string}>;
	transitionState: TransitionState;
	ref: React.Ref<HTMLInputElement>;
}

export const TaskModal: React.FC<TaskModalProps> = React.forwardRef((props, inputRef) => {
	const wrapperRef = React.useRef<HTMLFormElement>(null);
	const [value, setValue] = React.useState("");

	const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	return (
		<form
			ref={wrapperRef}
			// onClick={handleWrapperClick}
			// onSubmit={handleFormSubmit}
			className={`inputter ${props.transitionState}`}
		>
			<div className="inputter-input-wrapper">
				<input ref={inputRef} type="text" value={value} onChange={handleInputChange} />
				<Autocomplete onSelect={console.log} value={value} items={props.items} />
			</div>
		</form>
	);
});
