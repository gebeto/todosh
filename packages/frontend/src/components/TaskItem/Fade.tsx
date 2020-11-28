import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 200;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms cubic-bezier(0.6, 0, 0, 1)`,
	opacity: 0,
}

const transitionStyles: any = {
	entering: { opacity: 1, transform: 'translateY(0px)', },
	entered: { opacity: 1, transform: 'translateY(0px)', },
	exiting: { opacity: 0, transform: 'translateY(-10px)', },
	exited: { opacity: 0, transform: 'translateY(-10px)', },
};

export const Fade: React.FC<any> = ({ children, offset, ...props }) => {
	const [s, setS] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setS(true);
		}, offset);
	}, []);

	return (
		<Transition in={s} timeout={duration}>
			{state => (
				React.cloneElement(children, {
					...props,
					style: {
						...defaultStyle,
						...transitionStyles[state as any]
					}
				})
			)}
		</Transition>
	);
};
