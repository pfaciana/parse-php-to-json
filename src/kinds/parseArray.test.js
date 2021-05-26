const parseArray = require('./parseArray');

const arrays = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/array.json'), 'utf-8'));

const table = [
	[0, []],
	[1, {subtotal: 0, shipping_taxes: []}],
	[2, {
		status: '', prices_include_tax: false, date_created: null, date_paid: null,
		billing: {first_name: '', last_name: '', company: '',}
	}],
	[3, ['a', 1, true, null]],
	[4],
	[5],
];

test.each(table)('%s',
	(i, expected = arrays[i]) => {
		expect(parseArray(arrays[i])).toStrictEqual(expected);
	},
);