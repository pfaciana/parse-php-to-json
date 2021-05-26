const parseFunction = require('./parseFunction');

const functions = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/function.json'), 'utf-8'));

const table = [
	[0, {
		name: 'get_posts', arguments: [
			{name: 'args', value: null, byref: false, variadic: false,},
		],
	}],
	[1, {
		name: '__return_null', arguments: [],
	}],
	[2, {
		name: 'wp', arguments: [
			{name: 'query_vars', value: '', byref: false, variadic: false,},
		],
	}],
	[3, {
		name: 'wp_array_slice_assoc', arguments: [
			{name: 'array', byref: false, variadic: false,},
			{name: 'keys', byref: false, variadic: false,},
		],
	}],
	[4, {
		name: 'wp_is_stream', arguments: [
			{name: 'path', byref: false, variadic: false,},
		],
	}],
	[5, {
		name: 'wp_list_sort', arguments: [
			{name: 'list', byref: false, variadic: false, type: "\\Iterator",},
			{name: 'orderby', value: [], byref: false, variadic: false,},
			{name: 'order', value: 'ASC', byref: false, variadic: false,},
			{name: 'preserve_keys', value: false, byref: false, variadic: false,}
		],
	}],
	[6, {
		name: 'wp_parse_args', arguments: [
			{name: 'args', byref: false, variadic: false,},
			{name: 'defaults', value: '', byref: false, variadic: false,},
		],
	}],
	[7],
	[8],
];

test.each(table)('%s',
	(i, expected = functions[i]) => {
		expect(parseFunction(functions[i])).toStrictEqual(expected);
	},
);