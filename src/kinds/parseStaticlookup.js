function parseStaticlookup(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'staticlookup') {
		return obj;
	}

	const smartParser = require('./smartParse');

	return {value: smartParser(obj.what) + '::' + smartParser(obj.offset), type: 'constant'};
}

module.exports = parseStaticlookup;