const parseConstant = require('./parseConstant');

const constants = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/constant.json'), 'utf-8'));

const table = [
	[0, {name: 'CONSTANT3', value: 123}],
	[1, {name: 'CONSTANT2', value: 'constant value 2'}],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = constants[i]) => {
		expect(parseConstant(constants[i])).toStrictEqual(expected);
	},
);