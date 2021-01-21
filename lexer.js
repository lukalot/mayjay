/**
 * Mayjay Lexer
 * written by Lukalot in Vim with love
 *
 * feel free to delete this headline if you wish, just keep the GPLv3 licence and all is good
 */

// Run with deno ( deno run lexer.js )

const TOKEN_TYPES = {
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

function formatTokensToString(array) {
	let res = ''
	// and it will do so by doing a thing
	for (let item of array) {
		res = res + `${item.type.description}`
		if (item.value) res = res + `:${item.value}`
		res += '\n'
	}
	return res;
}

// ---------- ERROR HANDLING ---------------
class LexerError extends Error {
	get name() {
		return this.constructor.name;
	}
}

class IllegalCharacterError extends LexerError {
	constructor(character) {
		super(`Illegal character "${character}"`);
	}
}

// ------------- LEXER ---------------

class Token {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}

	[Deno.customInspect]() {
		return `${this.type.toString()} ${this.value}`;
	}
}

class Lexer {
	constructor(text) {
		this.text = text;
	}

	tokenize() {
		let tokens = [];
		let processing_text = this.text; // if I was smart I would have named this variable 'lext'
		while (processing_text) {
			let matched = false;
			for (let i in TOKEN_TYPES) {
				// check for a matching token
				let matches = processing_text.match(TOKEN_TYPES[i].PATTERN);

				if (matches) {
					// if there's a match, convert the array into the string we need
					const match = matches[0];
					// remove the matched text from the text we're lexing
					processing_text = processing_text.replace(match, '').trimStart();

					if (TOKEN_TYPES[i].RESOLVE) {
						tokens.push(TOKEN_TYPES[i].RESOLVE(match))
					} else {
						tokens.push(new Token(TOKEN_TYPES[i].ID));
					}
					matched = true;
					break;
				}
			}
			if (!matched) {
				throw new IllegalCharacterError(processing_text.charAt(0));
			}
		}
		return tokens;
	}
}

// -------------- PARSER ----------------

class NumberNode {
	constructor(token) {
		this.token = token;
	}

	[Deno.customInspect]() {
		return 'hello';
	}
}

class BinaryOperationNode {
	constructor(left_node, operation_token, right_node) {
		this.left_node = left_node;
		this.operation_token = operation_token;
		this.right_node = right_node;
	}

	[Deno.customInspect]() {
		return `(${
			this.left_node}, ${
			this.operation_token}, ${
			this.right_node})`
	}
}

class Parser {
	constructor(tokens) {
		this.tokens = tokens;
		this.index = 0;
		this.current_token = this.tokens[this.index]
	}

	advance() {
		this.index += 1;
		if (this.index < this.tokens.length) {
			this.current_token = this.tokens[this.index]
		}
		return this.current_token;
	}

	parse() {
		let res = this.expression();
		return res;
	}

	binaryOperation(inputFunction, operations) {
		let left = inputFunction()

		// Check if this token is in the list
		while (operations.indexOf(this.current_token.type) >= 0) {
			let operation_token = this.current_token;
			this.advance();
			let right = inputFunction();
			left = new BinaryOperationNode(left, operation_token, right);
		}
		return left;
	}

	factor() {
		let token = this.current_token;
		if (token.type === TOKEN_TYPES.TYPE_NUMBER.ID) {
			this.advance()
			return new NumberNode(token)
		}
	}

	term() {
		return this.binaryOperation(this.factor.bind(this), [TOKEN_TYPES.TYPE_MULTIPLY.ID, TOKEN_TYPES.TYPE_DIVIDE.ID])
	}

	expression() {
		return this.binaryOperation(this.term.bind(this), [TOKEN_TYPES.TYPE_ADD.ID, TOKEN_TYPES.TYPE_NEGATE.ID])
	}
}

// -------------- RUN ----------------
function run(text) {
	const lexer = new Lexer(text);
	const tokens = lexer.tokenize();

	// Abstract syntax tree time
	const parser = new Parser(tokens);
	const tree = parser.parse();

	console.log();
	console.log(tokens);
	console.log(formatTokensToString(tokens));
	console.log(tree);
}

while (true) {
	const input = prompt('Input:');

	if (input === null) {
		continue;
	}

	try {
		run(input.trim());
	} catch (error) {
		console.log(error.stack);
	}
}
