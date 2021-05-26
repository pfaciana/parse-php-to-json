const setLines = require('./setLines');

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
	[{}, undefined],
];

test.each(table)('%s',
	(input, expected) => {
		const ref = {};

		setLines(input, ref);

		expect(ref.lines).toStrictEqual(expected);
	},
);