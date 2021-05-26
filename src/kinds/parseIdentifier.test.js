const parseIdentifier = require('./parseIdentifier');

const identifiers = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/identifier.json'), 'utf-8'));

const table = [
	[0, '__construct'],
	[1, 'cart_item'],
	[2, 'CONSTANT'],
	[3, 'WC_Cart'],
	[4, 'wpdb'],
	[5],
	[6],
];

test.each(table)('%s',
	(i, expected = identifiers[i]) => {
		expect(parseIdentifier(identifiers[i])).toStrictEqual(expected);
	},
);