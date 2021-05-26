const setComments = require('./setComments');

const table = [
	[{
		leadingComments: [{
			value: "/**\n* Get the Unix Time.\n*\n** Used for `Expires`\n*\n* @param string $date String formatted date\n* @return int Unix Time\n*/",
		}],
	}, [
		{
			description: "Used for `Expires`",
			summary: "Get the Unix Time.",
			tags: [
				{
					desc: "String formatted date",
					name: "date",
					optional: false,
					tagName: "param",
					type: ["string"]
				},
				{
					desc: "Unix Time",
					name: null,
					tagName: "return",
					type: ["int"]
				}
			]
		}
	]],
	[{}, undefined]
];

test.each(table)('%s',
	(input, expected) => {
		const ref = {};

		setComments(input, ref);

		expect(ref.comments).toStrictEqual(expected);
	},
);