function parseUnary(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'unary') {
		return obj;
	}

	const smartParser = require('./smartParse');

	return +(obj.type + smartParser(obj.what));
}

module.exports = parseUnary;