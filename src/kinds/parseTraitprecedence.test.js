const parseTraitprecedence = require('./parseTraitprecedence');

const traitprecedences = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/traitprecedence.json'), 'utf-8'));

const table = [
	[0, {use: 'B', method: 'smallTalk', lines: [15, 15]}],
	[1, {use: 'A', method: 'bigTalk'}],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = traitprecedences[i]) => {
		expect(parseTraitprecedence(traitprecedences[i])).toStrictEqual(expected);
	},
);