import { renderHook, act } from '@testing-library/react-hooks';
import { useTransition } from './useTransition'


jest.useFakeTimers();


test('"entering" on mount and changed to "entered" after timer is end', () => {
	const { result } = renderHook(() => useTransition('exntered', true, 100));

	expect(result.current).toBe('entering');

	act(() => {
		jest.runAllTimers();
	});
	
	expect(result.current).toBe('entered');
});


test('"exiting" on mount and changed to "exited" after timer is end', () => {
	const { result } = renderHook(() => useTransition('exited', false, 100));

	expect(result.current).toBe('exiting');

	act(() => {
		jest.runAllTimers();
	});
	
	expect(result.current).toBe('exited');
});
