const setLines = require('./../setLines');
const setComments = require('./../setComments');
const organizeComments = require('./../organizeComments');

function parseTrait(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'trait') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const trait = {
		name: smartParser(obj.name),
	};

	obj.body.forEach(item => {
		const kind = item.kind;
		item = smartParser(item);

		if (kind === 'traituse') {
			const {traits = {}, adaptations, ...params} = item;
			Object.assign(((trait.traits ??= {}).use ??= {}), traits);
			Object.assign((trait.traits.adaptations ??= {}), adaptations);
		}

		if (kind === 'classconstant') {
			const {constants, visibility, ...params} = item;
			(trait.constants ??= {})[visibility] ??= {};
			for (const [name, value] of Object.entries(constants)) {
				trait.constants[visibility][name] = {value, ...params};
			}
		}

		if (kind === 'propertystatement') {
			const {properties, visibility, ...params} = item;
			(trait.properties ??= {})[visibility] ??= {};
			for (const [name, value] of Object.entries(properties)) {
				trait.properties[visibility][name] = {...value, ...params};
			}
		}

		if (kind === 'method') {
			const {name, visibility, ...params} = item;
			((trait.methods ??= {})[visibility] ??= {})[name] = params;
		}
	});

	setLines(obj, trait);
	setComments(obj, trait);
	organizeComments(trait);

	return trait;
}

module.exports = parseTrait;