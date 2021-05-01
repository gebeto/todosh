import * as React from 'react';
import './styles.scss';
import { SettingsIcon } from './settings-icon';

export type FloatBottomBarProps = {
    onClick: any;
    label?: string;
};

export const FloatBottomBar: React.FC<FloatBottomBarProps> = ({ onClick, label ="Add item to list" }) => {
    return (
        <div className="create-task">
            <div onClick={onClick} className="create-task-button create-task-input">{label}</div>
            <div className="create-task-button create-task-addons">
                <SettingsIcon width={32} height={32} />
            </div>
        </div>
    )
}
