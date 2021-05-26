function organizeComments(obj) {
	const {parser} = require('./processFile');
	const smartParse = require('./kinds/smartParse');

	obj.comments && (obj.comments = obj.comments.map(comment => {
		comment.tags = ((comment.tags ??= []).map(tag => {
			if (tag.tagName) {
				const tagName = tag.tagName[0] === '@' ? tag.tagName : '@' + tag.tagName;
				if (['@method'].includes(tagName)) {
					try {
						const method = smartParse(parser.parseCode(`<?php\nfunction ${tag.name} {}`).children[0]);
						tag.type = typeof tag.type === 'string' ? tag.type.split('|') : (typeof obj.type === 'undefined' || obj.type === null ? [] : [obj.type]);
						((obj.methods ??= {}).public ??= {})[method.name] = {
							arguments: (method.arguments ??= []), isAbstract: false, isFinal: false, isStatic: false,
							comments: [{
								summary: (tag.desc ?? null),
								description: null,
								tags: [{tagName: 'return', type: tag.type, name: null, desc: '',}]
							}],
						}
						return null;
					} catch (e) {
						console.log('\n\n\n---Error!---\n\n\n');
						return tag;
					}
				}
				if (['@property', '@property-read', '@property-write'].includes(tagName)) {
					((obj.properties ??= {}).public ??= {})[tag.name] = {value: null, isStatic: false, comments: [{summary: null, description: null, tags: [tag]}]}
					return null;
				}
			}
			return tag;
		})).filter(x => x);
		return comment;
	}));

	return obj;
}

module.exports = organizeComments;