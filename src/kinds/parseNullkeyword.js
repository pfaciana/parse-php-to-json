function parseNullkeyword(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'nullkeyword') {
		return obj;
	}

	return null;
}

module.exports = parseNullkeyword;