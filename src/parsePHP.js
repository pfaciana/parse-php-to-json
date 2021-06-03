const {promises: {readdir}, existsSync, ...fs} = require('fs');
const {resolve, extname, ...path} = require('path');
const isPlainObject = require('es5-util/js/isPlainObject');
const parsePaths = require('./parsePaths');
const processFile = require('./processFile');
const {writeToFile} = processFile;

function isValidDir(dir, options) {
	return !options.exclude.dirs.some(excludedDir => dir.endsWith(excludedDir));
}

function isValidFile(path, options) {
	return !options.exclude.files.some(excludedPath => path.endsWith(excludedPath));
}

function isValidExt(path, options) {
	if (options.include.exts.length) {
		return options.include.exts.includes(extname(path));
	}

	if (options.exclude.exts.length) {
		return !options.exclude.exts.includes(extname(path));
	}

	return true;
}

async function* getFiles(options) {
	options.include = parsePaths(options.include);
	options.exclude = parsePaths(options.exclude);

	async function* getFilesInner(dir) {
		const dirEntries = await readdir(dir, {withFileTypes: true});
		for (const dirEntry of dirEntries) {
			const path = resolve(dir, dirEntry.name);
			if (dirEntry.isDirectory()) {
				if (isValidDir(path, options)) {
					yield* getFilesInner(path);
				}
			} else {
				if (isValidFile(path, options) && isValidExt(path, options)) {
					yield path;
				}
			}
		}
	}

	for (const index in options.include.dirs) {
		if (options.include.dirs.hasOwnProperty(index)) {
			let path = options.include.dirs[index];
			if (!existsSync(path)) {
				path = process.cwd() + path;
			}
			if (existsSync(path)) {
				yield* getFilesInner(path);
			}
		}
	}

	for (const index in options.include.files) {
		if (options.include.files.hasOwnProperty(index)) {
			let path = options.include.files[index];
			if (!existsSync(path)) {
				path = process.cwd() + path;
			}
			if (existsSync(path)) {
				yield path;
			}
		}
	}
}

function parsePHP(options, callback = null) {
	const toc = {}, search = {};

	function getItemPath(ns, name, attr = null) {
		let itemPath = `\\${name}`;

		ns !== 'global' && (itemPath = `\\${ns}${itemPath}`);

		attr && (itemPath += `::${attr}`);

		return itemPath;
	}

	function getItemSummary(item, name) {
		let desc = ''

		if (item.comments) {
			const summary = item.comments[item.comments.length - 1].summary;
			const description = item.comments[item.comments.length - 1].description;
			if (summary && summary !== name) {
				desc = summary;
			} else if (description) {
				desc = description;
			}
		}

		if (!desc && item.extends) {
			desc = `extends ${item.extends}.`;
		}

		return desc;
	}

	function updateCachedData(details) {
		for (var ns in details.namespaces) {
			if (details.namespaces.hasOwnProperty(ns) && isPlainObject(details.namespaces[ns])) {
				toc[ns] ??= {};
				for (let ref in details.namespaces[ns]) {
					if (details.namespaces[ns].hasOwnProperty(ref) && isPlainObject(details.namespaces[ns][ref])) {
						toc[ns][ref] ??= {};
						const refItem = details.namespaces[ns][ref];
						for (let name in refItem) {
							if (refItem.hasOwnProperty(name) && isPlainObject(refItem[name])) {
								const item = refItem[name];
								const itemPath = getItemPath(ns, name);
								const itemDesc = getItemSummary(item, name);
								toc[ns][ref][name] = itemDesc;
								search[itemPath] = [itemDesc, [ref]];
								if (['classes', 'traits', 'interfaces'].includes(ref)) {
									for (let subRef of ['constants', 'properties', 'methods']) {
										if (subRef in item) {
											if (item.hasOwnProperty(subRef) && isPlainObject(item[subRef])) {
												const subRefItem = item[subRef];
												for (let visibility of ['public', 'protected', 'private']) {
													if (subRefItem.hasOwnProperty(visibility) && isPlainObject(subRefItem[visibility])) {
														const visibilityItems = subRefItem[visibility];
														for (let subName in visibilityItems) {
															if (visibilityItems.hasOwnProperty(subName) && isPlainObject(visibilityItems[subName])) {
																const subItem = visibilityItems[subName];
																const subItemPath = getItemPath(ns, name, subName);
																const subItemDesc = getItemSummary(subItem, subName);
																search[subItemPath] = [subItemDesc, [ref, subRef]];
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	fs.rmSync(options.dest, {force: true, recursive: true});
	(async () => {
		for await (const filename of getFiles(options)) {
			console.log(filename);
			updateCachedData(processFile(filename, options));
		}
		writeToFile(resolve(path.join(options.dest, 'toc.json')), JSON.stringify(toc));
		writeToFile(resolve(path.join(options.dest, 'search.json')), JSON.stringify(search));
		options.meta && writeToFile(resolve(path.join(options.dest, 'meta.json')), JSON.stringify(options.meta));
		typeof callback === 'function' && callback(toc, search);
	})();
}

module.exports = parsePHP;
module.exports.isValidDir = isValidDir;
module.exports.isValidExt = isValidExt;
module.exports.isValidFile = isValidFile;
module.exports.getFiles = getFiles;