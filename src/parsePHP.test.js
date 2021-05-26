const {sep, ...path} = require('path');
const parsePHP = require('./parsePHP');
const {isValidDir, isValidFile, isValidExt} = parsePHP;

const tableIsValidDir = [
	[`${sep}abc${sep}xyz`, {
		exclude: {dirs: []},
	}, true],
	[`${sep}abc${sep}xyz`, {
		exclude: {dirs: [`${sep}xyz`]},
	}, false],
	[`${sep}abc${sep}xyz`, {
		exclude: {dirs: [`${sep}abc`]},
	}, true],
];

test.each(tableIsValidDir)('dir %# - %s',
	(path, options, expected) => {
		expect(isValidDir(path, options)).toStrictEqual(expected);
	},
);

const tableIsValidFile = [
	[`${sep}parentDir${sep}some.file.php`, {
		include: {files: [], exts: []},
		exclude: {files: [], exts: []},
	}, true],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {files: [`${sep}some.file.php`], exts: []},
		exclude: {files: [], exts: []},
	}, true],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {files: [], exts: []},
		exclude: {files: [`${sep}some.file.php`], exts: []},
	}, false],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {files: [`${sep}other.file.php`], exts: []},
		exclude: {files: [], exts: []},
	}, true],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {files: [], exts: []},
		exclude: {files: [`${sep}other.file.php`], exts: []},
	}, true],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {files: [`${sep}some.file.php`], exts: []},
		exclude: {files: [`${sep}some.file.php`], exts: []},
	}, false],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {files: [`${sep}other.file.php`], exts: []},
		exclude: {files: [`${sep}other.file.php`], exts: []},
	}, true],
];

test.each(tableIsValidFile)('file %# - %s',
	(path, options, expected) => {
		expect(isValidFile(path, options)).toStrictEqual(expected);
	},
);

const tableIsValidExt = [
	[`${sep}parentDir${sep}some.file.php`, {
		include: {exts: []},
		exclude: {exts: []},
	}, true],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {exts: ['.php']},
		exclude: {exts: []},
	}, true],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {exts: []},
		exclude: {exts: ['.php']},
	}, false],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {exts: ['.js']},
		exclude: {exts: []},
	}, false],
	[`${sep}parentDir${sep}some.file.php`, {
		include: {exts: ['.php']},
		exclude: {exts: ['.php']},
	}, true],
];

test.each(tableIsValidExt)('ext %# - %s',
	(path, options, expected) => {
		expect(isValidExt(path, options)).toStrictEqual(expected);
	},
);