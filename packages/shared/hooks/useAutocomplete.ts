import React from 'react';


export const useAutocomplete = (items, term, limit=5) => {
	const filteredItems = React.useMemo(() => {
		const result = [];
		let foundCount = 0;
		if (term) {
			const _term = term.replace(/([().,*+])/g, "\\$1");
			const reg = new RegExp(_term, "i");
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (reg.test(item.title)) {
					result.push(item);
					foundCount++;
				}
				if (foundCount >= limit) {
					break;
				}
			}
			return result;
		}
		return items.slice(0, limit);
	}, [items, term]);

	return filteredItems;
}
