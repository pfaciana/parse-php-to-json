const parseUseitem = require('./parseUseitem');

const useitems = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/useitem.json'), 'utf-8'));

const table = [
	[0, {name: 'DOMXPath', as: 'Bob'}],
	[1, {name: 'JmesPath', as: 'JmesPath'}],
	[2, {name: "Minifier\\TinyMinify", as: 'TinyMinify', lines: [3, 3]}],
	[3],
	[4],
];

test.each(table)('%s',
	(i, expected = useitems[i]) => {
		expect(parseUseitem(useitems[i])).toStrictEqual(expected);
	},
);