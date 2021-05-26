const setComments = require('./../setComments');

function parseUsegroup(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'usegroup') {
		return obj;
	}

	const smartParser = require('./smartParse');

	return obj.items.map(item => {
		item = smartParser(item)
		return setComments(obj, item);
	});
}

module.exports = parseUsegroup;