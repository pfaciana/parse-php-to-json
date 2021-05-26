const parseComments = require('parse-docblocks')

function setComments(obj, ref) {
	if (!('leadingComments' in obj)) {
		return ref;
	}

	const config = {
		prefixPragmas: false,
		prefixVariables: false,
		defaultObj: true,
		typeToArray: true,
	};

	obj.leadingComments.forEach(comment => {
		const parsedComments = parseComments(comment.value, config);
		(ref.comments ??= []).push(parsedComments);
	});

	return ref;
}

module.exports = setComments;