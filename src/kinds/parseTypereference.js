function parseTypereference(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'typereference') {
		return obj;
	}

	return obj.name;
}

module.exports = parseTypereference;