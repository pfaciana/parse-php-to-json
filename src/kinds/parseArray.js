function parseArray(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'array') {
		return obj;
	}

	const smartParser = require('./smartParse');

	let items;

	obj.items.forEach(item => {
		item = smartParser(item);
		if ('key' in item && item.key !== null) {
			items ??= {};
			items[item.key] = item.value;
		} else {
			items ??= [];
			items.push(item.value)
		}
	})

	return items ?? [];
}

module.exports = parseArray;