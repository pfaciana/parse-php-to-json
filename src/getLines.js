function getLines(obj) {
	if (typeof obj === 'undefined' || obj === null
		|| typeof obj !== 'object' || !('loc' in obj)) {
		return null;
	}

	return [obj.loc.start.line, obj.loc.end.line];
}


module.exports = getLines;