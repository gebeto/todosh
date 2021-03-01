import { renderHook, act } from '@testing-library/react-hooks';
import { useAutocomplete } from './useAutocomplete'


const testData = [
	{ id: 1, title: ' Hello' },
	{ id: 2, title: 'H ello' },
	{ id: 3, title: 'He llo' },
	{ id: 4, title: 'Hel lo' },
	{ id: 5, title: 'Hell o' },
	{ id: 6, title: 'Hello( ' },
	{ id: 7, title: 'Hello) ' },
	{ id: 8, title: 'Hello. ' },
	{ id: 9, title: 'Hello* ' },
	{ id: 10, title: 'Hello+ ' },
];


describe('returns array', () => {
	const { result } = renderHook(() => useAutocomplete(testData, "title", "he", 1));

	it('returns array', () => {
		expect(result.current).toBeInstanceOf(Array);
	});

	it('of not modified items', () => {
		expect(result.current).toContain(testData[0]);
	});

	it('of limited items count (from start)', () => {
		expect(result.current.length).toBe(1);
	});
});


it('default limit is 5', () => {
	const { result } = renderHook(() => useAutocomplete(testData, "title", "h"));
	expect(result.current.length).toBe(5);
});


describe('Structure', () => {
	it('term string can contain regex symbol "."', () => {
		const { result } = renderHook(() => useAutocomplete(testData, "title", "."));
		expect(result.current.length).toBe(1);
	});

	it('term string can contain regex symbol "*"', () => {
		const { result } = renderHook(() => useAutocomplete(testData, "title", "*"));
		expect(result.current.length).toBe(1);
	});

	it('term string can contain regex symbol "+"', () => {
		const { result } = renderHook(() => useAutocomplete(testData, "title", "+"));
		expect(result.current.length).toBe(1);
	});

	it('term string can contain regex symbol "("', () => {
		const { result } = renderHook(() => useAutocomplete(testData, "title", "("));
		expect(result.current.length).toBe(1);
	});

	it('term string can contain regex symbol ")"', () => {
		const { result } = renderHook(() => useAutocomplete(testData, "title", ")"));
		expect(result.current.length).toBe(1);
	});

});
