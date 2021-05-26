const parseMethod = require('./parseMethod');

const methods = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/method.json'), 'utf-8'));

const table = [
	[0, {
		name: 'get_posts', isAbstract: false, isFinal: false, isStatic: false, visibility: 'public',
		arguments: [{name: 'cart_item_key', byref: false, variadic: false,}],
	}],
	[1, {
		name: 'array_slice_assoc', isAbstract: false, isFinal: false, isStatic: false, visibility: 'private',
		arguments: [{name: 'code', byref: false, variadic: false,}],
	}],
	[2, {
		name: 'is_stream', isAbstract: false, isFinal: false, isStatic: true, visibility: 'private',
		arguments: [{name: 'data', byref: false, variadic: false,}],
	}],
	[3, {
		name: 'list_sort', isAbstract: false, isFinal: false, isStatic: false, visibility: 'protected',
		arguments: [{name: 'item', byref: false, variadic: false, type: "\\Iterator",}],
	}],
	[4, {
		name: 'parse_args', isAbstract: false, isFinal: false, isStatic: false, visibility: 'public',
		arguments: [{name: 'key', byref: false, variadic: false,}],
	}],
	[5, {
		name: '__construct', isAbstract: false, isFinal: true, isStatic: true, visibility: 'public',
		arguments: [{name: 'name', byref: false, variadic: false,}],
	}],
	[6, {
		name: '__get', isAbstract: true, isFinal: false, isStatic: false, visibility: 'protected',
		arguments: [{name: 'query', byref: false, variadic: false,}],
	}],
	[7],
	[8],
];

test.each(table)('%s',
	(i, expected = methods[i]) => {
		expect(parseMethod(methods[i])).toStrictEqual(expected);
	},
);