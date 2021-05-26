const {isAbsolute, normalize, posix, win32, sep} = require('path');

function normalizePath(path) {
	path = normalize(path);
	path = path.slice(-1) === sep ? path.slice(0, -1) : path;
	path = !isAbsolute(path) && path[0] !== sep ? sep + path : path
	return path
}

function parsePath(path) {
	if (typeof path !== 'string' || path === '.') {
		return [];
	}

	if (path[0] === '.' && (path[1] === posix.sep || path[1] === posix.win32)) {
		path = path.slice(1);
	}

	path = normalize(path);

	if (path === sep) {
		return [];
	}

	if (path.slice(-1) === sep) {
		return ['dirs', normalizePath(path)];
	}

	if (!path.includes(sep)) {
		if (!path.includes('.')) {
			return ['dirs', normalizePath(path)];
		} else if (path[0] === '.') {
			return ['exts', path];
		} else {
			return ['files', normalizePath(path)];
		}
	}

	if (path.lastIndexOf('.') > path.lastIndexOf(sep)) {
		return ['files', normalizePath(path)];
	}

	return ['dirs', normalizePath(path)];
}

module.exports = parsePath;
module.exports.normalizePath = normalizePath;