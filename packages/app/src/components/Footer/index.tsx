import * as React from 'react';

import { useFocus } from '@wsl/shared/hooks/useFocus';
import { TasksAutocomplete } from '../TasksAutocomplete';
import { SettingsButton } from './SettingsButton';
import { FloatBottomBar, FloatBottomBarButtonInput, FloatBottomBarButtonAddon } from '@wsl/shared/components/FloatBottomBar';

import './styles.scss';


export const Footer: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [inputRef, focus] = useFocus<HTMLInputElement>();

	const handleOpen = React.useCallback(() => {
		setOpen(true);
		focus();
	}, []);

	const handleClose = React.useCallback(() => {
		setOpen(false);
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.value = "";
			}
		}, 300);
	}, []);

	return (
		<React.Fragment>
			<FloatBottomBar onClick={handleOpen}>
				<FloatBottomBarButtonInput onClick={handleOpen}>Add item to list</FloatBottomBarButtonInput>
				<FloatBottomBarButtonAddon>
					<SettingsButton />
				</FloatBottomBarButtonAddon>
			</FloatBottomBar>
			<TasksAutocomplete open={open} inputRef={inputRef} handleClose={handleClose} />
		</React.Fragment>
	)
}
