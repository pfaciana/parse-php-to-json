function parseNumber(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'number') {
		return obj;
	}

	return +obj.value;
}

module.exports = parseNumber;