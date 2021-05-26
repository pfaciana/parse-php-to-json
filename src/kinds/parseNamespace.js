const setLines = require('./../setLines');

function parseNamespace(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'namespace') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const namespace = {};

	let name = smartParser(obj.name);

	name = Array.isArray(name) ? name.join("\\") : name;
	name = name ? name : 'global';

	namespace.name = name;

	setLines(obj, namespace);

	obj.children.forEach(child => {
		const kind = child.kind;
		child = smartParser(child);

		if (kind === 'usegroup') {
			(namespace.uses ??= []).push(...child);
		}

		if (kind === 'trait') {
			const {name, ...params} = child;
			(namespace.traits ??= {})[name] = params;
		}

		if (kind === 'interface') {
			const {name, ...params} = child;
			(namespace.interfaces ??= {})[name] = params;
		}

		if (kind === 'class') {
			const {name, ...params} = child;
			(namespace.classes ??= {})[name] = params;
		}

		if (kind === 'function') {
			const {name, ...params} = child;
			(namespace.functions ??= {})[name] = params;
		}
	});

	return namespace;
}

module.exports = parseNamespace;