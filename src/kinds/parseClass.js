const setLines = require('./../setLines');
const setComments = require('./../setComments');
const organizeComments = require('./../organizeComments');

function parseClass(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'class') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const classtype = {
		name: smartParser(obj.name),
		extends: smartParser(obj.extends),
		implements: (obj.implements || []).map(implement => smartParser(implement)),
		isAnonymous: obj.isAnonymous || false,
		isAbstract: obj.isAbstract || false,
		isFinal: obj.isFinal || false,
	};

	obj.body.forEach(item => {
		const kind = item.kind;
		item = smartParser(item);

		if (kind === 'traituse') {
			const {traits = {}, adaptations, ...params} = item;
			Object.assign(((classtype.traits ??= {}).use ??= {}), traits);
			Object.assign((classtype.traits.adaptations ??= {}), adaptations);
		}

		if (kind === 'classconstant') {
			const {constants, visibility, ...params} = item;
			(classtype.constants ??= {})[visibility] ??= {};
			for (const [name, value] of Object.entries(constants)) {
				classtype.constants[visibility][name] = {value, ...params};
			}
		}

		if (kind === 'propertystatement') {
			const {properties, visibility, ...params} = item;
			(classtype.properties ??= {})[visibility] ??= {};
			for (const [name, value] of Object.entries(properties)) {
				classtype.properties[visibility][name] = {...value, ...params};
			}
		}

		if (kind === 'method') {
			const {name, visibility, ...params} = item;
			((classtype.methods ??= {})[visibility] ??= {})[name] = params;
		}
	});

	setLines(obj, classtype);
	setComments(obj, classtype);
	organizeComments(classtype);

	return classtype;
}

module.exports = parseClass;