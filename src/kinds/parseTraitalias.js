const setLines = require('./../setLines');

function parseTraitalias(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'traitalias') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const traitalias = {
		use: smartParser(obj.trait),
		method: smartParser(obj.method),
		as: smartParser(obj.as),
		visibility: obj.visibility || 'public',
	};

	setLines(obj, traitalias);

	return traitalias;
}

module.exports = parseTraitalias;