import * as React from 'react';
import cn from 'classnames';

import { useDocumentEvent } from '../../hooks/useDocumentEvent';
import { useTransition } from '../../hooks/useTransition';

import './styles.scss';


export { useTransition } from '../../hooks/useTransition';


export type ModalProps = React.PropsWithChildren<{
	open: boolean,
	handleClose(): any,
}>


export const Modal: React.FC<ModalProps> = (props) => {
	const transitionState = useTransition("exited", props.open, 500);
	const wrapperRef = React.useRef(null);

	const handleModalClose = React.useCallback(() => {
		props.handleClose();
	}, []);

	const handleWrapperClick = React.useCallback((e: React.MouseEvent) => {
		if (e.target === wrapperRef.current) {
			handleModalClose();
		}
	}, []);

	useDocumentEvent<KeyboardEvent>("keydown", (e) => {
		if (e.key === "Escape") {
			handleModalClose();
		}
	});

	return (
		<div ref={wrapperRef} onClick={handleWrapperClick} className={cn("modal-wrapper", transitionState)}>
			<div className="modal">
				{props.children}
			</div>
		</div>
	);
};
