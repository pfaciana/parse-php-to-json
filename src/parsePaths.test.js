const {sep, ...path} = require('path');
const parsePaths = require('./parsePaths');

const table = [
	['vendor', {
		dirs: [`${sep}vendor`],
		files: [],
		exts: [],
	}],
	['vendor/somePkg', {
		dirs: [`${sep}vendor${sep}somePkg`],
		files: [],
		exts: [],
	}],
	['someFile.php', {
		dirs: [],
		files: [`${sep}someFile.php`],
		exts: [],
	}],
	['parentDir/someFile.php', {
		dirs: [],
		files: [`${sep}parentDir${sep}someFile.php`],
		exts: [],
	}],
	['.php', {
		dirs: [],
		files: [],
		exts: [`.php`],
	}],
	[['./vendor', 'some.file.js', '.php', 'parentDir\\childDir/other.file.js', 'parentDir/childDir\\childDir', '/.htaccess', '.htaccess', 'error_log', '\\access_log'], {
		dirs: [`${sep}vendor`, `${sep}parentDir${sep}childDir${sep}childDir`, `${sep}error_log`, `${sep}access_log`],
		files: [`${sep}some.file.js`, `${sep}parentDir${sep}childDir${sep}other.file.js`, `${sep}.htaccess`],
		exts: [`.php`, `.htaccess`],
	}],
	[{exts: ['.php'],}, {
		dirs: [],
		files: [],
		exts: [`.php`],
	}],
	[{
		dirs: [`vendor`, `parentDir/childDir\\childDir`],
		files: [`/some.file.js`, `parentDir\\childDir/other.file.js`, `\\.htaccess`, 'error_log', '\\access_log'],
		exts: [`.php`],
	}, {
		dirs: [`${sep}vendor`, `${sep}parentDir${sep}childDir${sep}childDir`],
		files: [`${sep}some.file.js`, `${sep}parentDir${sep}childDir${sep}other.file.js`, `${sep}.htaccess`, `${sep}error_log`, `${sep}access_log`],
		exts: [`.php`],
	}],
];

test.each(table)('%s',
	(input, expected) => {
		expect(parsePaths(input)).toStrictEqual(expected);
	},
);