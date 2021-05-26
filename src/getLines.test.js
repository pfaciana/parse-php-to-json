const getLines = require('./getLines');

const table = [
	[{
		loc: {
			source: '...',
			start: {
				line: 3,
				column: 0,
				offset: 9
			},
			end: {
				line: 345,
				column: 1,
				offset: 12345
			}
		}
	}, [3, 345]],
	[[], null],
];

test.each(table)('%s',
	(input, expected) => {
		expect(getLines(input)).toStrictEqual(expected);
	},
);