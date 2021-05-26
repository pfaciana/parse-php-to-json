const setLines = require('./../setLines');

function parseTraitprecedence(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'traitprecedence') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const traitprecedence = {
		method: smartParser(obj.method),
		use: smartParser(obj.trait),
	};

	setLines(obj, traitprecedence);

	return traitprecedence;
}

module.exports = parseTraitprecedence;