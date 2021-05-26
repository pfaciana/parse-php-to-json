const setLines = require('./../setLines');
const setComments = require('./../setComments');

function parseTraituse(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'traituse') {
		return obj;
	}

	obj.adaptations ??= [];

	const smartParser = require('./smartParse');

	const traituse = {
		traits: {},
		adaptations: {},
	};

	obj.traits.forEach(trait => {
		const name = smartParser(trait)
		traituse.traits[name] = setLines(trait, {});
		traituse.traits[name] = setComments(obj, traituse.traits[name]);
	});

	obj.adaptations.forEach(adaptation => {
		let {method, as = null, ...params} = smartParser(adaptation);
		if (as) {
			params.method = method;
			method = as;
		}
		traituse.adaptations[method] = params;
	});

	return traituse;
}

module.exports = parseTraituse;