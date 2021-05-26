const parsers = {};
parsers['array'] = require('./parseArray');
parsers['boolean'] = require('./parseBoolean');
parsers['class'] = require('./parseClass');
parsers['classconstant'] = require('./parseClassconstant');
parsers['constant'] = require('./parseConstant');
parsers['entry'] = require('./parseEntry');
parsers['function'] = require('./parseFunction');
parsers['identifier'] = require('./parseIdentifier');
parsers['interface'] = require('./parseInterface');
parsers['method'] = require('./parseMethod');
parsers['name'] = require('./parseName');
parsers['namespace'] = require('./parseNamespace');
parsers['nullkeyword'] = require('./parseNullkeyword');
parsers['number'] = require('./parseNumber');
parsers['parameter'] = require('./parseParameter');
parsers['program'] = require('./parseProgram');
parsers['property'] = require('./parseProperty');
parsers['propertystatement'] = require('./parsePropertystatement');
parsers['string'] = require('./parseString');
parsers['staticlookup'] = require('./parseStaticlookup');
parsers['trait'] = require('./parseTrait');
parsers['traitalias'] = require('./parseTraitalias');
parsers['traitprecedence'] = require('./parseTraitprecedence');
parsers['traituse'] = require('./parseTraituse');
parsers['typereference'] = require('./parseTypereference');
parsers['unary'] = require('./parseUnary');
parsers['usegroup'] = require('./parseUsegroup');
parsers['useitem'] = require('./parseUseitem');

function smartParse(obj) {
	if (typeof obj !== 'object' || obj === null || !('kind' in obj) || !(obj.kind in parsers)) {
		return obj;
	}

	return parsers[obj.kind](obj);
}

module.exports = smartParse;
module.exports.parsers = parsers;