const parseTrait = require('./parseTrait');

const traits = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/trait.json'), 'utf-8'));

const table = [
	[0, {name: 'ezcReflectionReturnInfo', lines: [10, 72]}],
	[1, {
		name: 'ezcReflectionReturnInfo',
		traits: {
			use: {A: {}, B: {}, CurlProxyTrait: {}},
			adaptations: {
				smallTalk: {use: 'B'},
				bigTalk: {use: 'A'},
				talk: {use: 'B', method: 'bigTalk', visibility: 'public'}
			},
		},
		properties: {
			protected: {
				ready: {value: null, isStatic: false},
			},
			public: {
				show_errors: {value: null, isStatic: true, lines: [99, 99]},
				page: {value: 'PHP_ROUND_HALF_UP', type: 'constant', isStatic: true, lines: [99, 99]}
			}
		},
		methods: {
			private: {
				get_posts: {
					isAbstract: false, isFinal: false, isStatic: false,
					arguments: [{name: 'cart_item_key', byref: false, variadic: false,}],
					lines: [134, 137],
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
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = traits[i]) => {
		expect(parseTrait(traits[i])).toStrictEqual(expected);
	},
);