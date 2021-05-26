const parseUsegroup = require('./parseUsegroup');

const usegroups = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/usegroup.json'), 'utf-8'));

const table = [
	[0, [{name: 'DOMXPath', as: 'Bob', lines: [3, 3]}, {name: 'DOMXPath2', as: 'Frank'}]],
	[1, [{name: 'JmesPath', as: 'JmesPath'}]],
	[2, [{name: "Minifier\\TinyMinify", as: 'TinyMinify'}]],
	[3],
	[4],
];

test.each(table)('%s',
	(i, expected = usegroups[i]) => {
		expect(parseUsegroup(usegroups[i])).toStrictEqual(expected);
	},
);