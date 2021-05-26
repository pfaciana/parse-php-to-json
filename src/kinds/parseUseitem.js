const setLines = require('./../setLines');

function parseUseitem(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'useitem') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const item = {
		name: obj.name,
	};

	item.as = smartParser(obj.alias) || obj.name.split("\\").pop();

	setLines(obj, item);

	return item;
}

module.exports = parseUseitem;