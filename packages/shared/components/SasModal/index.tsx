import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import { useDocumentEvent } from '../../hooks/useDocumentEvent';
import { useTransition } from '../../hooks/useTransition';

import { ModalTitle } from './Title';
import './styles.scss';


export enum ModalPosition {
	top = "position-top",
	center = "position-center",
	bottom = "position-bottom",
}

export type ModalProps = React.PropsWithChildren<{
	open: boolean;
	handleClose(): any;
	position?: ModalPosition;
	title?: string;
}>


export const Modal: React.FC<ModalProps> = (props) => {
	// const transitionState = useTransition("exited", props.open, 500);
	const wrapperRef = React.useRef(null);

	const handleModalClose = React.useCallback(() => {
		props.handleClose();
	}, []);

	const handleWrapperClick = React.useCallback((e: React.MouseEvent) => {
		if (e.target === wrapperRef.current) {
			handleModalClose();
		}
	}, []);

	useDocumentEvent("keydown", (e) => {
		if (e.key === "Escape") {
			handleModalClose();
		}
	});

	const className = cn("sas-modal-wrapper", props.position, props.open ? "open" : "close");

	return ReactDOM.createPortal(
		(
			<div ref={wrapperRef} onClick={handleWrapperClick} className={className}>
				<div className="modal">
					{props.title && <ModalTitle>{props.title}</ModalTitle>}
					{props.children}
				</div>
			</div>
		),
		document.body,
	)
};


Modal.defaultProps = {
	position: ModalPosition.top,
}


export { useTransition } from '../../hooks/useTransition';
