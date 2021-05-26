const parseName = require('./parseName');

const names = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/name.json'), 'utf-8'));

const table = [
	[0, "\\Iterator"],
	[1, "\\UnitTester"],
	[2, 'PHP_ROUND_HALF_UP'],
	[3, 'WC_Abstract_Order'],
	[4, 'WC_Legacy_Cart'],
	[5],
	[6],
];

test.each(table)('%s',
	(i, expected = names[i]) => {
		expect(parseName(names[i])).toStrictEqual(expected);
	},
);