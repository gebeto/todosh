import { renderHook, act } from '@testing-library/react-hooks';
import { useToggle } from './useToggle'

describe('useToggle', () => {
	
	it('default value is false', () => {
		const { result } = renderHook(() => useToggle());
		expect(result.current[0]).toBe(false);
	});
	
	it('handleOpen change value to true', () => {
		const { result } = renderHook(() => useToggle());
		
		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe(true);
	});
	
	it('handleClose change value to false', () => {
		const { result } = renderHook(() => useToggle());

		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe(true);

		act(() => {
			result.current[2]();
		});
		expect(result.current[0]).toBe(false);
	});

});
