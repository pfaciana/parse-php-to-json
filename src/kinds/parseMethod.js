const setLines = require('./../setLines');
const setComments = require('./../setComments');

function parseMethod(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'method') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const method = {
		name: smartParser(obj.name),
		arguments: obj.arguments.map(parameter => smartParser(parameter)),
		isAbstract: obj.isAbstract,
		isFinal: obj.isFinal,
		isStatic: obj.isStatic,
		visibility: obj.visibility || 'public',
	};

	setLines(obj, method);
	setComments(obj, method);

	return method;
}

module.exports = parseMethod;