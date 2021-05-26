function parseIdentifier(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'identifier') {
		return obj;
	}

	return obj.name;
}

module.exports = parseIdentifier;