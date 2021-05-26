const setLines = require('./../setLines');
const setComments = require('./../setComments');

function parseFunction(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'function') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const functiontype = {
		name: smartParser(obj.name),
		arguments: obj.arguments.map(parameter => smartParser(parameter)),
	};

	setLines(obj, functiontype);
	setComments(obj, functiontype);

	return functiontype;
}

module.exports = parseFunction;