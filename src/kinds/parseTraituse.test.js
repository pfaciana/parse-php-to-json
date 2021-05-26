const parseTraituse = require('./parseTraituse');

const traituses = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/traituse.json'), 'utf-8'));

const table = [
	[0, {traits: {CurlProxyTrait2: {}}, adaptations: {}}],
	[1, {
		traits: {A: {lines: [12, 12]}, B: {lines: [14, 18]}},
		adaptations: {
			smallTalk: {use: 'B', lines: [15, 15]},
			bigTalk: {use: 'A'},
			talk: {use: 'B', method: 'bigTalk', visibility: 'public'}
		}
	}],
	[2, {traits: {CurlProxyTrait: {}}, adaptations: {}}],
	[3],
	[4],
];

test.each(table)('%s',
	(i, expected = traituses[i]) => {
		expect(parseTraituse(traituses[i])).toStrictEqual(expected);
	},
);