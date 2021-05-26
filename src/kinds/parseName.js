function parseName(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'name') {
		return obj;
	}

	return obj.name;
}

module.exports = parseName;