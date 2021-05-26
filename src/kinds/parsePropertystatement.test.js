const parsePropertystatement = require('./parsePropertystatement');

const propertystatements = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/propertystatement.json'), 'utf-8'));

const table = [
	[0, {properties: {options: {value: []}}, visibility: 'public', isStatic: false}],
	[1, {properties: {comments: {value: []}}, visibility: 'protected', isStatic: false, lines: [99, 99]}],
	[2, {properties: {is_mysql: {value: false}}, visibility: 'private', isStatic: false}],
	[3, {properties: {totals: {value: 0}}, visibility: 'public', isStatic: false}],
	[4, {properties: {show_errors: {value: null}, page: {value: 'PHP_ROUND_HALF_UP', type: 'constant'}}, visibility: 'public', isStatic: true}],
	[5, {properties: {param: {value: null, type: "\\UnitTester",}}, visibility: 'protected', isStatic: false}],
	[6],
	[7],
];

test.each(table)('%s',
	(i, expected = propertystatements[i]) => {
		expect(parsePropertystatement(propertystatements[i])).toStrictEqual(expected);
	},
);