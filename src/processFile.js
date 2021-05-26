const fs = require('fs');
const path = require('path');
const phpParser = require('php-parser');
const smartParse = require('./kinds/smartParse');

const ignoreKeys = ['lines'];

var parser = new phpParser({
	parser: {debug: false, locations: true, extractDoc: true, suppressErrors: true, php7: true,},
	ast: {withPositions: true, withSource: false,},
	lexer: {all_tokens: true, comment_tokens: true, mode_eval: false, asp_tags: true, short_tags: true,},
});

function writeToFile(filename, content) {
	fs.mkdirSync(path.dirname(filename), {recursive: true})
	fs.writeFileSync(filename, content);
}

function processFile(filename, options) {
	const phpFile = fs.readFileSync(filename, options.encoding || 'utf-8');
	const parsed = parser.parseCode(phpFile);
	const details = smartParse(parsed);

	'namespaces' in details && Object.keys(details.namespaces).forEach(namespace => {
		let dir = namespace.split("\\").join(path.sep);
		dir = dir === 'global' ? '' : dir + path.sep;
		Object.keys(details.namespaces[namespace]).forEach(type => {
			if (ignoreKeys.includes(type)) {
				return;
			}

			const isArray = Array.isArray(details.namespaces[namespace][type]);
			const destFilename = path.resolve(path.join(options.dest, 'data', dir, type + '.json'));

			for (const name of Object.keys(details.namespaces[namespace][type])) {
				details.namespaces[namespace][type][name].file = filename;
			}

			const newContent = details.namespaces[namespace][type];
			const srcContent = fs.existsSync(destFilename) ? JSON.parse(fs.readFileSync(destFilename, options.encoding)) : (isArray ? [] : {});
			const destContent = isArray ? newContent.concat(srcContent) : Object.assign({}, srcContent, newContent);

			writeToFile(destFilename, JSON.stringify(destContent));
		});
	});

	return details;
}

module.exports = processFile;
module.exports.writeToFile = writeToFile;
module.exports.parser = parser;
