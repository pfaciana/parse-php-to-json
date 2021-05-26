function parseProgram(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || obj.kind !== 'program') {
		return obj;
	}

	const smartParser = require('./smartParse');

	const program = {};

	obj.children.forEach(child => {
		const kind = child.kind;
		child = smartParser(child);

		if (kind === 'namespace') {
			const {name, ...params} = child;
			(program.namespaces ??= {})[name] ??= {};
			Object.keys(params).map(key => {
				if (Array.isArray(params[key])) {
					program.namespaces[name][key] = (program.namespaces[name][key] ??= []).concat(params[key]);
				} else {
					Object.assign((program.namespaces[name][key] ??= {}), params[key])
				}
			});
		} else {
			(program.namespaces ??= {}).global ??= {};

			if (kind === 'usegroup') {
				(program.namespaces.global.uses ??= []).push(...child);
			}

			if (kind === 'trait') {
				const {name, ...params} = child;
				(program.namespaces.global.traits ??= {})[name] = params;
			}

			if (kind === 'interface') {
				const {name, ...params} = child;
				(program.namespaces.global.interfaces ??= {})[name] = params;
			}

			if (kind === 'class') {
				const {name, ...params} = child;
				(program.namespaces.global.classes ??= {})[name] = params;
			}

			if (kind === 'function') {
				const {name, ...params} = child;
				(program.namespaces.global.functions ??= {})[name] = params;
			}
		}
	});

	program.errors = obj.errors ?? [];

	return program;
}

module.exports = parseProgram;