const parseTraitalias = require('./parseTraitalias');

const traitaliases = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/traitalias.json'), 'utf-8'));

const table = [
	[0, {use: 'B', method: 'bigTalk', as: 'talk', visibility: 'public', lines: [17, 17]}],
	[1, {use: 'B', method: 'bigTalk', as: 'talk', visibility: 'protected'}],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = traitaliases[i]) => {
		expect(parseTraitalias(traitaliases[i])).toStrictEqual(expected);
	},
);