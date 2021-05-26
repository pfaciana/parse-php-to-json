function parseEntry(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'entry') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const entry = {};

	entry.byRef = obj.byRef || false;
	obj.key && (entry.key = smartParser(obj.key));
	entry.value = smartParser(obj.value);
	entry.value?.type === 'constant' && Object.assign(entry, entry.value)
	obj?.value?.kind === 'name' && (entry.type = 'constant');

	return entry;
}

module.exports = parseEntry;