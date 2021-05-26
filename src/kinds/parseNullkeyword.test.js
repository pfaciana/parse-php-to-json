const parseNullkeyword = require('./parseNullkeyword');

const nullkeywords = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/nullkeyword.json'), 'utf-8'));

const table = [
	[0, null],
	[1],
	[2]
];

test.each(table)('%s',
	(i, expected = nullkeywords[i]) => {
		expect(parseNullkeyword(nullkeywords[i])).toStrictEqual(expected);
	},
);