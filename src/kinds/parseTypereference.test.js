const parseTypereference = require('./parseTypereference');

const typereferences = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/typereference.json'), 'utf-8'));

const table = [
	[0, 'string'],
	[1, 'array'],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = typereferences[i]) => {
		expect(parseTypereference(typereferences[i])).toStrictEqual(expected);
	},
);