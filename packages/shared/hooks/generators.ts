export type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];

export type OnlyTypes<O, S> = {
	[Q in FilteredKeys<O, S>]: O[Q]
};


export function* filterIterator<
	T extends Record<string, any>,
	F extends OnlyTypes<T, string>,
>(items: Array<T>, key: keyof F, reg: RegExp) {
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const testString = (item as F)[key];
		if (reg.test(testString)) {
			yield item;
		}
	}
}


export const map = (iterator: Generator, limit=-1) => {
	const result = [];
	let item = iterator.next();
	let count = 0;
	while (!item.done) {
		if (limit > -1) {
			count++;
			if (count >= limit) {
				iterator.return(false);
			}
		}
		result.push(item.value);
		item = iterator.next();
	}
	return result;
}
