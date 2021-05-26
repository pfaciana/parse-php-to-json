function parseBoolean(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'boolean') {
		return obj;
	}

	return obj.value;
}

module.exports = parseBoolean;