const parseNamespace = require('./parseNamespace');

const namespaces = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../../tests/data/kinds/namespace.json'), 'utf-8'));

const table = [
	[0, {name: "RequestClient\\Request"}],
	[1, {
		name: "RequestClient\\Request",
		lines: [2, 345],
		uses: [{name: 'DOMXPath', as: 'Bob'}, {name: 'DOMXPath2', as: 'Frank'}, {name: 'JmesPath', as: 'JmesPath'}],
		traits: {
			ezcReflectionReturnInfo: {
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
							arguments: [{name: 'key', byref: false, variadic: false, type: "\\Iterator",}],
						},
					},
				},
			},
			ezcReflectionReturnInfo2: {},
		},
		interfaces: {
			WC_Logger_Interface: {
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
					}
				},
			},
		},
		classes: {
			Cookie: {
				extends: 'CookieHeaders', implements: ["\\SomeOther"], isAnonymous: false, isAbstract: true, isFinal: false,
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
						CONSTANT1: {value: 123}
					},
					public: {
						CONSTANT2: {value: 456},
						CONSTANT3: {value: 789},
					},
				},
			},
			Cookies: {
				extends: null, implements: [], isAnonymous: false, isAbstract: false, isFinal: false,
			},
		},
		functions: {
			wp_parse_args: {
				lines: [323, 336],
				arguments: [
					{name: 'args', byref: false, variadic: false,},
					{name: 'defaults', value: '', byref: false, variadic: false,},
				],
			},
			__return_null: {
				arguments: [],
			},
		},
	}],
	[2],
	[3],
];

test.each(table)('%s',
	(i, expected = namespaces[i]) => {
		expect(parseNamespace(namespaces[i])).toStrictEqual(expected);
	},
);