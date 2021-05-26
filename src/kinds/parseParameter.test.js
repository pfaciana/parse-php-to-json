const parseParameter = require('./parseParameter');

const parameters = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/parameter.json'), 'utf-8'));

const table = [
	[0, {name: 'posts', byref: false, variadic: false,}],
	[1, {name: 'args', byref: false, variadic: true,}],
	[2, {name: 'pages', byref: true, variadic: false,}],
	[3, {name: 'cookie', byref: false, variadic: false, type: "\\Iterator"}],
	[4, {name: 'args', byref: false, variadic: false, type: 'array'}],
	[5, {name: 'args', value: [], byref: false, variadic: false,}],
	[6, {name: 'keys', value: [], byref: false, variadic: false,}],
	[7, {name: 'keys', value: ['a', 1, true, null], byref: false, variadic: false,}],
	[8, {name: 'query', value: false, byref: false, variadic: false,}],
	[9, {name: 'round', value: true, byref: false, variadic: false,}],
	[10, {name: 'output', value: 'ARRAY_A', byref: false, variadic: false, type: 'constant'}],
	[11, {name: 'args', value: null, byref: false, variadic: false,}],
	[12, {name: 'name', value: null, byref: false, variadic: false, type: 'string'}],
	[13, {name: 'post_id', value: 0, byref: false, variadic: false,}],
	[14, {name: 'expires', value: 1.23, byref: false, variadic: false,}],
	[15, {name: 'args', value: '', byref: false, variadic: false,}],
	[16, {name: 'headers', value: "Content-Type: text/html\r\n", byref: false, variadic: false,}],
	[17, {name: 'action', value: -1, byref: false, variadic: false,}],
	[18],
	[19],
];

test.each(table)('%s',
	(i, expected = parameters[i]) => {
		expect(parseParameter(parameters[i])).toStrictEqual(expected);
	},
);