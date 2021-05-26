const parseUnary = require('./parseUnary');

const unaries = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/unary.json'), 'utf-8'));

const table = [
	[0, -1],
	[1],
	[2],
];

test.each(table)('%s',
	(i, expected = unaries[i]) => {
		expect(parseUnary(unaries[i])).toStrictEqual(expected);
	},
);