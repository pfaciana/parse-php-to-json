const parseClass = require('./parseClass');

const classes = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/class.json'), 'utf-8'));

const table = [
	[0, {
		name: 'WC_AJAX', extends: null, implements: [], isAnonymous: false, isAbstract: false, isFinal: false, lines: [10, 72],
	}],
	[1, {
		name: 'WC_Cart', extends: 'WC_Legacy_Cart', implements: [], isAnonymous: false, isAbstract: false, isFinal: false,
	}],
	[2, {
		name: 'WC_Order', extends: 'WC_Abstract_Order', implements: [], isAnonymous: false, isAbstract: false, isFinal: false,
	}],
	[3, {
		name: 'Headers', extends: null, implements: [], isAnonymous: false, isAbstract: false, isFinal: false,
	}],
	[4, {
		name: 'wpdb', extends: null, implements: [], isAnonymous: false, isAbstract: false, isFinal: false,
	}],
	[5, {
		name: 'Cookie', extends: 'CookieHeaders', implements: ["\\SomeOther"], isAnonymous: false, isAbstract: true, isFinal: false,
		traits: {
			use: {A: {}, B: {}, CurlProxyTrait: {}},
			adaptations: {
				smallTalk: {use: 'B'},
				bigTalk: {use: 'A'},
				talk: {use: 'B', method: 'bigTalk', visibility: 'public'}
			},
		},
		constants: {
			protected: {
				CONSTANT1: {value: 123, lines: [91, 91]}
			},
			public: {
				CONSTANT2: {value: 456, lines: [71, 71]},
				CONSTANT3: {value: 789, lines: [71, 71]},
			},
		},
		properties: {
			protected: {
				param: {value: null, type: "\\UnitTester", isStatic: false},
			},
			public: {
				show_errors: {value: null, isStatic: true},
				page: {value: 'PHP_ROUND_HALF_UP', type: 'constant', isStatic: true}
			}
		},
		methods: {
			private: {
				get_posts: {
					isAbstract: false, isFinal: false, isStatic: false,
					arguments: [{name: 'cart_item_key', byref: false, variadic: false,}],
				}
			},
			public: {
				__construct: {
					isAbstract: false, isFinal: true, isStatic: true,
					arguments: [{name: 'name', byref: false, variadic: false,}],
				},
				parse_args: {
					isAbstract: false, isFinal: false, isStatic: false,
					arguments: [{name: 'key', byref: false, variadic: false,}],
				},
			},
		},
	}],
	[7],
	[8],
];

test.each(table)('%s',
	(i, expected = classes[i]) => {
		expect(parseClass(classes[i])).toStrictEqual(expected);
	},
);