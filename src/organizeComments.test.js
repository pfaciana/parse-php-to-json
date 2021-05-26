const parseClass = require('./kinds/parseClass');

const classes = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '/../tests/data/kinds/class.json'), 'utf-8'));

const table = [
	[6, {
		name: "Cookie", extends: null, implements: [], isAbstract: false, isAnonymous: false, isFinal: false, lines: [26, 489],
		properties: {
			protected: {
				url: {value: null, isStatic: false, lines: [31, 31]},
				urlParts: {value: null, isStatic: false, lines: [36, 36]},
			},
			public: {
				timestamp: {value: null, isStatic: false, lines: [41, 41]},
				data: {value: null, isStatic: false, comments: [{summary: null, description: null, tags: [{tagName: "property-read", name: "data", type: ["object"], desc: "",}]}]},
				iuserinfo: {value: null, isStatic: false, comments: [{summary: null, description: null, tags: [{tagName: "property", name: "iuserinfo", type: ["string"], desc: "Userinfo part of the IRI (after '://' and before '@')",}]}]},
				uri: {value: null, isStatic: false, comments: [{summary: null, description: null, tags: [{tagName: "property-read", name: "uri", type: ["string"], desc: "IRI in URI form",}]}]},
				frameRate: {value: null, isStatic: false, comments: [{summary: null, description: null, tags: [{tagName: "property-read", name: "frameRate", type: ["float"], desc: "The frame rate.",}]}]},
				sharedDateTime: {value: null, isStatic: false, comments: [{summary: null, description: null, tags: [{tagName: "property-read", name: "sharedDateTime", type: ["\\DateTime"], desc: "The shared date/time.",}]}]},
				timezones: {value: null, isStatic: false, comments: [{summary: null, description: null, tags: [{tagName: "property", name: "timezones", type: ["DateTimeZone[]"], desc: "the timezones",}]}]},
			},
		},
		methods: {
			protected: {
				parseCookie: {
					isAbstract: false, isFinal: false, isStatic: false, lines: [88, 114],
					arguments: [
						{byref: false, name: "cookie", variadic: false},
					],
				},
			},
			public: {
				__construct: {
					isAbstract: false, isFinal: false, isStatic: false, lines: [67, 80],
					arguments: [
						{byref: false, name: "cookie", value: null, variadic: false},
						{byref: false, name: "url", value: null, variadic: false},
						{byref: false, name: "timestamp", value: null, variadic: false},
					],
				},
				word: {
					isAbstract: false, isFinal: false, isStatic: false, comments: [{summary: "", description: null, tags: [{tagName: "return", name: null, type: ["string"], desc: "",}]}],
					arguments: [],
				},
				creditCardNumber: {
					isAbstract: false, isFinal: false, isStatic: false, comments: [{summary: "", description: null, tags: [{tagName: "return", name: null, type: ["string"], desc: "",}]}],
					arguments: [
						{byref: false, name: "type", value: null, variadic: false},
						{byref: false, name: "formatted", value: false, variadic: false},
						{byref: false, name: "separator", value: "-", variadic: false},
					],
				},
				dateTimeBetween: {
					isAbstract: false, isFinal: false, isStatic: false, comments: [{summary: "", description: null, tags: [{tagName: "return", name: null, type: ["\\DateTime"], desc: "",}]}],
					arguments: [
						{byref: false, name: "startDate", value: "-30 years", variadic: false},
						{byref: false, name: "endDate", value: "now", variadic: false},
						{byref: false, name: "timezone", value: null, variadic: false},
					],
				},
				randomKey: {
					isAbstract: false, isFinal: false, isStatic: false, comments: [{summary: "Create a random key.", description: null, tags: [{tagName: "return", name: null, type: ["int", "string", "null"], desc: "",}]}],
					arguments: [
						{byref: true, name: "array", variadic: false},
					],
				},
				randomElements: {
					isAbstract: false, isFinal: false, isStatic: false, comments: [{summary: ")", description: null, tags: [{tagName: "return", name: null, type: ["array"], desc: "",}]}],
					arguments: [
						{byref: false, name: "array", value: ['a', 'b', 'c'], variadic: false, type: 'array'},
						{byref: false, name: "count", value: 1, variadic: false},
						{byref: false, name: "args", variadic: true},
					],
				},
			},
		},
		comments: [
			{
				summary: "Class Cookie",
				description: null,
				tags: [
					{tagName: "package", name: null, type: null, desc: "RequestClient\\Request",},


				],
			},
		],
	}],
];

test.each(table)('%s',
	(i, expected = classes[i]) => {
		expect(parseClass(classes[i])).toStrictEqual(expected);
	},
);