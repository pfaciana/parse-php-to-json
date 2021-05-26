const getLines = require('./getLines');

function setLines(obj, ref) {
	const lines = getLines(obj);

	lines && (ref.lines = lines);

	return ref;
}


module.exports = setLines;