import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import './styles.scss';


const taskItemTransitionClassNames: any = {
    appear: "task-list-item",
    enterActive: "task-list-item-completed-active",
    enterDone: "task-list-item-completed",
    exitActive: "task-list-item-uncompleted-active",
    exitDone: "task-list-item-uncompleted",
}


export const CompletedTransition: React.FC<{ completed: boolean }> = ({ children, completed }) => {
    return (
        <CSSTransition
            classNames={taskItemTransitionClassNames}
            children={children}
            in={completed}
            timeout={300}
        />
    )
}
