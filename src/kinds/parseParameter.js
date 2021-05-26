function parseParameter(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'parameter') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const parameter = {
		name: smartParser(obj.name),
		byref: obj.byref,
		variadic: obj.variadic,
	};

	if (obj.value !== null) {
		let value = smartParser(obj.value);
		if (typeof value === 'object' && value !== null && 'value' in value && 'type' in value && ['constant'].includes(value.type)) {
			Object.assign(parameter, value);
		} else {
			parameter.value = value;
		}
	}

	obj.value?.kind === 'name' && (parameter.type = 'constant');
	obj.type && (parameter.type = smartParser(obj.type));

	return parameter;
}

module.exports = parseParameter;