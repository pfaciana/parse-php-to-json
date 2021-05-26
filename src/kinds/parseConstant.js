function parseConstant(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'constant') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const name = smartParser(obj.name);
	const value = smartParser(obj.value);

	return {name, value};
}

module.exports = parseConstant;