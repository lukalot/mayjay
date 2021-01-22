export const TOKEN_TYPES = {
	TYPE_NUMBER: { // Integers and Floats
		ID: Symbol('NUMBER'),
		PATTERN: /^\d+(\.\d+)?/,
		RESOLVE: (content) => new Token(TOKEN_TYPES.TYPE_NUMBER.ID, Number(content))
	},
	TYPE_ADD: {
		ID: Symbol('ADD'),
		PATTERN: /^\+/
	},
	TYPE_NEGATE: {
		ID: Symbol('NEGATE'),
		PATTERN: /^\-/
	},
	TYPE_MULTIPLY: {
		ID: Symbol('MULTIPLY'),
		PATTERN: /^\*/
	},
	TYPE_DIVIDE: {
		ID: Symbol('DIVIDE'),
		PATTERN: /^\//
	},
	TYPE_LEFT_PARENTHESES: {
		ID: Symbol('LEFT PARENTHESES'),
		PATTERN: /^\(/
	},
	TYPE_RIGHT_PARENTHESES: {
		ID: Symbol('RIGHT PARENTHESES'),
		PATTERN: /^\)/
	},
	TYPE_END_LINE: {
		ID: Symbol('END LINE'),
		PATTERN: /^,/
	},
	TYPE_CONDITION: {
		ID: Symbol('CONDITION'),
		PATTERN: /^for/
	},
	TYPE_CHECK_DECLARATION: {
		ID: Symbol('CHECK DECLARATION'),
		PATTERN: /^check/
	},
	TYPE_EFFECT_DECLARATION: {
		ID: Symbol('EFFECT DECLARATION'),
		PATTERN: /^effect/
	},
	BLOCK_PRECEDENT: {
		ID: Symbol('BLOCK PRECEDENT'),
		PATTERN: /^\:/
	},
	COMMENT: {
		ID: Symbol('COMMENT'),
		PATTERN: /^#.*/
	},
	LOOP: {
		ID: Symbol('LOOP'),
		PATTERN: /^loop/
	},
	NAME: {
		ID: Symbol('NAME'),
		PATTERN: /^[A-Za-z][\d\w-_]*/ // Starts with a letter, and includes only letters, numbers from 0-9, dashes, and underscores
	},
}
