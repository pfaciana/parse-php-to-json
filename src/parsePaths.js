const {normalize, sep} = require('path');
const isPlainObject = require('es5-util/js/isPlainObject');
const parsePath = require('./parsePath');
const {normalizePath} = parsePath;

function parsePaths(input) {
	const paths = {dirs: [], files: [], exts: [],}; // maybe regex in the future

	if (isPlainObject(input)) {
		for (const type in paths) {
			if (paths.hasOwnProperty(type) && type in input) {
				input[type] = Array.isArray(input[type]) ? input[type] : [input[type]];
				input[type].forEach(item => paths[type].push(type === 'exts' ? item : normalizePath(item)));
			}
		}
		return paths;
	}

	if (typeof input === 'string') {
		input = [input];
	}

	if (Array.isArray(input)) {
		input.forEach(item => {
			const [type = null, path = null] = parsePath(item);
			type && path && type in paths && paths[type].push(path);
		});
	}

	return paths;
}


module.exports = parsePaths;