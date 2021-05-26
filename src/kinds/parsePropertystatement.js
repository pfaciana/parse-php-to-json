const setLines = require('./../setLines');
const setComments = require('./../setComments');

function parsePropertystatement(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'propertystatement') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const propertystatement = {
		visibility: obj.visibility || 'public',
		isStatic: obj.isStatic,
		properties: {},
	};

	obj.properties.forEach(property => {
		const {name, ...params} = smartParser(property);
		propertystatement.properties[name] = params;
	});

	setLines(obj, propertystatement);
	setComments(obj, propertystatement);

	return propertystatement;
}

module.exports = parsePropertystatement;