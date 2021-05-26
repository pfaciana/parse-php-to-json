const setLines = require('./../setLines');
const setComments = require('./../setComments');
const organizeComments = require('./../organizeComments');

function parseInterface(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'interface') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const interfacetype = {
		name: smartParser(obj.name),
		extends: smartParser(obj.extends),
	};

	obj.body.forEach(item => {
		const kind = item.kind;
		item = smartParser(item);

		if (kind === 'traituse') {
			const {traits, adaptations, ...params} = item;
			((interfacetype.traits ??= {}).use ??= []).push(...traits);
			Object.assign((interfacetype.traits.adaptations ??= {}), adaptations);
		}

		if (kind === 'classconstant') {
			const {constants, visibility, ...params} = item;
			(interfacetype.constants ??= {})[visibility] ??= {};
			for (const [name, value] of Object.entries(constants)) {
				interfacetype.constants[visibility][name] = {value, ...params};
			}
		}

		if (kind === 'propertystatement') {
			const {properties, visibility, ...params} = item;
			(interfacetype.properties ??= {})[visibility] ??= {};
			for (const [name, value] of Object.entries(properties)) {
				interfacetype.properties[visibility][name] = {...value, ...params};
			}
		}

		if (kind === 'method') {
			const {name, visibility, ...params} = item;
			((interfacetype.methods ??= {})[visibility] ??= {})[name] = params;
		}
	});

	setLines(obj, interfacetype);
	setComments(obj, interfacetype);
	organizeComments(interfacetype);

	return interfacetype;
}

module.exports = parseInterface;