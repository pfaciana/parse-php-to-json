const {sep, ...path} = require('path');
const parsePath = require('./parsePath');

const table = [
	[`./vendor/`, ['dirs', `${sep}vendor`]],
	[`/vendor/`, ['dirs', `${sep}vendor`]],
	[`vendor/`, ['dirs', `${sep}vendor`]],
	[`./vendor`, ['dirs', `${sep}vendor`]],
	[`/vendor`, ['dirs', `${sep}vendor`]],
	[`vendor`, ['dirs', `${sep}vendor`]],

	[`./parentDir/childDir/childDir/`, ['dirs', `${sep}parentDir${sep}childDir${sep}childDir`]],
	[`/parentDir/childDir/childDir/`, ['dirs', `${sep}parentDir${sep}childDir${sep}childDir`]],
	[`parentDir/childDir/childDir/`, ['dirs', `${sep}parentDir${sep}childDir${sep}childDir`]],
	[`./parentDir/childDir/childDir`, ['dirs', `${sep}parentDir${sep}childDir${sep}childDir`]],
	[`/parentDir/childDir/childDir`, ['dirs', `${sep}parentDir${sep}childDir${sep}childDir`]],
	[`parentDir/childDir/childDir`, ['dirs', `${sep}parentDir${sep}childDir${sep}childDir`]],

	[`./parentDir/child.dir/childDir/`, ['dirs', `${sep}parentDir${sep}child.dir${sep}childDir`]],
	[`/parentDir/child.dir/childDir/`, ['dirs', `${sep}parentDir${sep}child.dir${sep}childDir`]],
	[`parentDir/child.dir/childDir/`, ['dirs', `${sep}parentDir${sep}child.dir${sep}childDir`]],
	[`./parentDir/child.dir/childDir`, ['dirs', `${sep}parentDir${sep}child.dir${sep}childDir`]],
	[`/parentDir/child.dir/childDir`, ['dirs', `${sep}parentDir${sep}child.dir${sep}childDir`]],
	[`parentDir/child.dir/childDir`, ['dirs', `${sep}parentDir${sep}child.dir${sep}childDir`]],

	[`./some.file.js/`, ['dirs', `${sep}some.file.js`]],
	[`/some.file.js/`, ['dirs', `${sep}some.file.js`]],
	[`some.file.js/`, ['dirs', `${sep}some.file.js`]],
	[`./some.file.js`, ['files', `${sep}some.file.js`]],
	[`/some.file.js`, ['files', `${sep}some.file.js`]],
	[`some.file.js`, ['files', `${sep}some.file.js`]],

	[`./parentDir/childDir/other.file.js/`, ['dirs', `${sep}parentDir${sep}childDir${sep}other.file.js`]],
	[`/parentDir/childDir/other.file.js/`, ['dirs', `${sep}parentDir${sep}childDir${sep}other.file.js`]],
	[`parentDir/childDir/other.file.js/`, ['dirs', `${sep}parentDir${sep}childDir${sep}other.file.js`]],
	[`./parentDir/childDir/other.file.js`, ['files', `${sep}parentDir${sep}childDir${sep}other.file.js`]],
	[`/parentDir/childDir/other.file.js`, ['files', `${sep}parentDir${sep}childDir${sep}other.file.js`]],
	[`parentDir/childDir/other.file.js`, ['files', `${sep}parentDir${sep}childDir${sep}other.file.js`]],

	[`./.htaccess/`, ['dirs', `${sep}.htaccess`]],
	[`/.htaccess/`, ['dirs', `${sep}.htaccess`]],
	[`.htaccess/`, ['dirs', `${sep}.htaccess`]],
	[`./.htaccess`, ['files', `${sep}.htaccess`]],
	[`/.htaccess`, ['files', `${sep}.htaccess`]],
	[`.htaccess`, ['exts', `.htaccess`]],

	[`./.test.php/`, ['dirs', `${sep}.test.php`]],
	[`/.test.php/`, ['dirs', `${sep}.test.php`]],
	[`.test.php/`, ['dirs', `${sep}.test.php`]],
	[`./.test.php`, ['files', `${sep}.test.php`]],
	[`/.test.php`, ['files', `${sep}.test.php`]],
	[`.test.php`, ['exts', `.test.php`]],

	[`./.php/`, ['dirs', `${sep}.php`]],
	[`/.php/`, ['dirs', `${sep}.php`]],
	[`.php/`, ['dirs', `${sep}.php`]],
	[`./.php`, ['files', `${sep}.php`]],
	[`/.php`, ['files', `${sep}.php`]],
	[`.php`, ['exts', `.php`]],

	['C:\\Web\\project', ['dirs', `C:${sep}Web${sep}project`]],

	[[`.php`], []],
	[`./`, []],
	[`.`, []],
	[{}, []],
];

test.each(table)('%s',
	(input, expected) => {
		expect(parsePath(input)).toStrictEqual(expected);
	},
);