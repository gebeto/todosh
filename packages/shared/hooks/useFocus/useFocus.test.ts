import { renderHook, act } from '@testing-library/react-hooks';
import { useFocus } from './useFocus'


describe('Structure', () => {
	const { result } = renderHook(() => useFocus());

	it('returns array with two items', () => {
		expect(result.current.length).toBe(2);
	});

	it('first element is REF object', () => {
		expect(result.current[0]).toBeInstanceOf(Object);
	});

	it('second element is FOCUS method', () => {
		expect(result.current[1]).toBeInstanceOf(Function);
	});

});


describe('Behavior', () => {
	
	it('FOCUS method calls REF\'s .focus() method', () => {
		const { result } = renderHook(() => useFocus());
		result.current[0].current = {focus: jest.fn()}

		act(() => {
			result.current[1]();
		});

		expect(result.current[0].current.focus).toHaveBeenCalled();
	});

});
