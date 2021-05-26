const parseBoolean = require('./parseBoolean');

const booleans = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/boolean.json'), 'utf-8'));

const table = [
	[0, false],
	[1, true],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = booleans[i]) => {
		expect(parseBoolean(booleans[i])).toStrictEqual(expected);
	},
);