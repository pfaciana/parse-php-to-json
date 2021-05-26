const parseEntry = require('./parseEntry');

const entries = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/entry.json'), 'utf-8'));

const table = [
	[0, {value: [2], byRef: false}],
	[1, {value: true, byRef: false}],
	[2, {value: null, byRef: false}],
	[3, {value: 2, byRef: false}],
	[4, {value: 'posts', byRef: false}],
	[5, {value: '', key: 'first_name', byRef: false}],
	[6, {value: 0, key: 'subtotal', byRef: false}],
	[7, {value: null, key: 'date_created', byRef: false}],
	[8, {value: false, key: 'prices_include_tax', byRef: false}],
	[9, {value: '', key: 'order_key', byRef: false}],
	[10, {value: {first_name: 'Doug', last_name: '', company: '',}, key: 'billing', byRef: false}],
	[11, {value: [], key: 'cart_contents_taxes', byRef: false}],
	[12, {value: 'WC_Log_Levels::NOTICE', type: 'constant', byRef: false}],
	[13, {value: 'CONSTANT1', type: 'constant', byRef: false}],
	[14],
	[15],
];

test.each(table)('%s',
	(i, expected = entries[i]) => {
		expect(parseEntry(entries[i])).toStrictEqual(expected);
	},
);