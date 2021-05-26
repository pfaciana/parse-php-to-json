function parseString(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'string') {
		return obj;
	}

	return obj.value;
}

module.exports = parseString;