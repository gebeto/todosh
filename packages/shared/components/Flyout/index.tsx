import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import { useDocumentEvent } from '../../hooks/useDocumentEvent';
import { FlyoutTitle } from './Title';

import './styles.scss';


export type FlyoutProps = React.PropsWithChildren<{
	open: boolean;
	handleClose(): any;
	title?: string;
}>


export const Flyout: React.FC<FlyoutProps> = (props) => {
	const wrapperRef = React.useRef(null);

	const handleFlyoutClose = React.useCallback(() => {
		props.handleClose();
	}, []);

	const handleWrapperClick = React.useCallback((e: React.MouseEvent) => {
		if (e.target === wrapperRef.current) {
			handleFlyoutClose();
		}
	}, []);

	useDocumentEvent("keydown", (e) => {
		if (e.key === "Escape") {
			handleFlyoutClose();
		}
	});

	const className = cn("flyout-wrapper", props.open ? "open" : "close");

	return ReactDOM.createPortal(
		(
			<div ref={wrapperRef} onClick={handleWrapperClick} className={className}>
				<div className="flyout">
					{props.title && <FlyoutTitle>{props.title}</FlyoutTitle>}
					{props.children}
				</div>
			</div>
		),
		document.body,
	)
};


export { useTransition } from '../../hooks/useTransition';
