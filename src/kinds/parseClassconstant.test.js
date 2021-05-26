const parseClassconstant = require('./parseClassconstant');

const classconstants = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/classconstant.json'), 'utf-8'));

const table = [
	[0, {constants: {CONSTANT1: 123}, visibility: 'protected'}],
	[1, {constants: {CONSTANT2: 456, CONSTANT3: 789}, visibility: 'public', lines: [91, 91]}],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = classconstants[i]) => {
		expect(parseClassconstant(classconstants[i])).toStrictEqual(expected);
	},
);