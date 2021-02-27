export type FilterCallback<T> = (item: T, length?: number, arr?: T[]) => boolean;

export const filterWithLimit = <T>(arr: T[], limit: number, callback: FilterCallback<T>) => {
	const arrLength = arr.length;
	const result: T[] = [];
	for (let i = 0; i < arrLength; i++) {
		if (callback(arr[i], arrLength, arr)) {
			result.push(arr[i]);
		}

		if (result.length >= limit) {
			break;
		}
	}
	return result;
}
