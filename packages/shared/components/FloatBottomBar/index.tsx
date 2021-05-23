import * as React from 'react';
import './styles.scss';

export type FloatBottomBarProps = {
    onClick: any;
    label?: string;
};

export const FloatBottomBar: React.FC<FloatBottomBarProps> = ({ onClick, children, label ="Add item to list" }) => {
	if (children) {
		return (
			<div className="create-task">
				{children}
			</div>
		);
	}

	return (
		<div className="create-task">
			<FloatBottomBarButtonInput onClick={onClick}>{label}</FloatBottomBarButtonInput>
		</div>
	);
}

export const FloatBottomBarButtonInput: React.FC<{ onClick: any }> = ({ children, onClick }) => (
	<div onClick={onClick} className="create-task-button create-task-input">{children}</div>
);

export const FloatBottomBarButtonAddon: React.FC = ({ children }) => (
	<div className="create-task-button create-task-addon">{children}</div>
);
