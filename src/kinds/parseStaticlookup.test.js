const parseStaticlookup = require('./parseStaticlookup');

const staticlookups = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/staticlookup.json'), 'utf-8'));

const table = [
	[0, {value: 'WC_Log_Levels::NOTICE', type: 'constant'}],
	[1],
	[2],
];

test.each(table)('%s',
	(i, expected = staticlookups[i]) => {
		expect(parseStaticlookup(staticlookups[i])).toStrictEqual(expected);
	},
);