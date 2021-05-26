const setLines = require('./../setLines');
const setComments = require('./../setComments');

function parseClassconstant(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'classconstant') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const classconstant = {
		constants: {},
		visibility: obj.visibility || 'public',
	};

	obj.constants.forEach(constant => {
		constant = smartParser(constant);
		classconstant.constants[constant.name] = constant.value;
	});

	setLines(obj, classconstant);
	setComments(obj, classconstant);

	return classconstant;
}

module.exports = parseClassconstant;