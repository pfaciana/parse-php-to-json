const parseProperty = require('./parseProperty');

const properties = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/property.json'), 'utf-8'));

const table = [
	[0, {name: 'args', value: {subtotal: 0}}],
	[1, {name: 'args', value: ['users', 'usermeta']}],
	[2, {name: 'args', value: []}],
	[3, {name: 'format', value: false}],
	[4, {name: 'format', value: true}],
	[5, {name: 'page', value: 'PHP_ROUND_HALF_UP', type: 'constant'}],
	[6, {name: 'posts', value: null}],
	[7, {name: 'count', value: 0}],
	[8, {name: 'first_name', value: 'Paul'}],
	[9, {name: 'param', value: null, type: "\\UnitTester"}],
	[10, {name: 'arg', value: null}],
	[11],
	[12],
];

test.each(table)('%s',
	(i, expected = properties[i]) => {
		expect(parseProperty(properties[i])).toStrictEqual(expected);
	},
);