const parseNumber = require('./parseNumber');

const numbers = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/number.json'), 'utf-8'));

const table = [
	[0, 0],
	[1, 1],
	[2, 1],
	[3, 1.23],
	[4, 123],
	[5, 512],
	[6],
	[7],
];

test.each(table)('%s',
	(i, expected = numbers[i]) => {
		expect(parseNumber(numbers[i])).toStrictEqual(expected);
	},
);