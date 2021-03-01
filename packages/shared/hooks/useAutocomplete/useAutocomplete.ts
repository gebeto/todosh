import React from 'react';
import { filterIterator, map, OnlyTypes } from './generators';


const strToRegExpReg = /([().,*+])/g;
const strToRegExpPreparer = (str: string) => str.replace(strToRegExpReg, "\\$1");
const strToRegExp = (str: string) => new RegExp(strToRegExpPreparer(str), "i");


export const useAutocomplete = <
	T extends Record<string, any>,
	F extends OnlyTypes<T, string>,
>(items: Array<T>, key: keyof F, term: string, limit=5) => {
	const filteredItems = React.useMemo(() => {
		if (term) {
			const reg = strToRegExp(term);
			const iterator = filterIterator(items, key, reg);
			return map(iterator, limit);
		}
		return items.slice(0, limit);
	}, [items, term]);

	return filteredItems;
}
