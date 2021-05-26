const parseString = require('./parseString');

const strings = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/string.json'), 'utf-8'));

const table = [
	[0, ''],
	[1, '500'],
	[2, 'address_1'],
	[3, "Content-Type: text/html\r\n"],
	[4, 'ONLY_FULL_GROUP_BY'],
	[5],
	[6],
];

test.each(table)('%s',
	(i, expected = strings[i]) => {
		expect(parseString(strings[i])).toStrictEqual(expected);
	},
);