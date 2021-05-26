const parseProgram = require('./parseProgram');

const programs = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/program.json'), 'utf-8'));

const table = [
	[0, {
		namespaces: {
			"RequestClient\\Request": {
				functions: {
					__return_null: {
						arguments: [],
					},
				},
			},
		},
		errors: []
	}],
	[1, {
		namespaces: {
			global: {
				functions: {
					__return_null: {
						arguments: [],
					},
				},
			},
		},
		errors: []
	}],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = programs[i]) => {
		const smartParser = require('./smartParse');

		expect(parseProgram(programs[i])).toStrictEqual(expected);
		expect(smartParser(programs[i])).toStrictEqual(expected);
	},
);