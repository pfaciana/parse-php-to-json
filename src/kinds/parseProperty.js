function parseProperty(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'property') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const property = {
		name: smartParser(obj.name),
		value: smartParser(obj.value),
	}

	obj?.value?.kind === 'name' && (property.type = 'constant');
	obj.type && (property.type = smartParser(obj.type));

	return property;
}

module.exports = parseProperty;