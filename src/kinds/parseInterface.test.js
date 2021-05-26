const parseInterface = require('./parseInterface');

const interfaces = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/interface.json'), 'utf-8'));

const table = [
	[0, {
		name: 'WC_Logger_Interface',
		extends: null,
		methods: {
			public: {
				add: {
					arguments: [
						{name: 'handle', variadic: false, byref: false,},
						{name: 'message', variadic: false, byref: false,},
						{name: 'level', value: 'WC_Log_Levels::NOTICE', type: 'constant', variadic: false, byref: false,},
					],
					isAbstract: false,
					isFinal: false,
					isStatic: false
				},
				log: {
					arguments: [
						{name: 'level', variadic: false, byref: false,},
						{name: 'message', variadic: false, byref: false,},
						{name: 'context', value: [], variadic: false, byref: false,},
					],
					isAbstract: false,
					isFinal: false,
					isStatic: false
				}
			}
		}
	}],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = interfaces[i]) => {
		expect(parseInterface(interfaces[i])).toStrictEqual(expected);
	},
);