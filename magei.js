
const TOKEN_TYPES = {
	NUMBER: { // Integers and Floats
		ID: Symbol('number tokenid'),
		PATTERN: /^\d+(\.\d+)?/,
		RESOLVE: ( content ) => new Token(TOKEN_TYPES.NUMBER.ID, Number( content ))
	},
	ADD: {
		ID: Symbol('add tokenid'),
		PATTERN: /^\+/
	},
	SUBTRACT: {
		ID: Symbol('subtract tokenid'),
		PATTERN: /^\-/
	},
	MULTIPLY: {
	        ID: Symbol('multiplication tokenid'),
	        PATTERN: /^\*/
	},
	DIVIDE: {
		ID: Symbol('division tokenid'),
		PATTERN: /^\//
	},
	LEFT_PARENTHESES: {
		ID: Symbol('left parentheses tokenid'),
		PATTERN: /^\(/
	},
	RIGHT_PARENTHESES: {
		ID: Symbol('right parentheses tokenid'),
		PATTERN: /^\)/		
	},
	WHITESPACE: {
		ID: Symbol('whitespace tokenid'),
		PATTERN: /^\s+/
	},
	END_LINE: {
		ID: Symbol('end line tokenid'),
		PATTERN: /^,/
	},
	CONDITION: {
		ID: Symbol('condition tokenid'),
		PATTERN: /^for/
	},
	CHECK_DECLARATION: {
		ID: Symbol('check declaration tokenid'),
		PATTERN: /^check/
	},
	DO_OR_ASSIGN: {
		ID: Symbol('do or assign symbol'),
		PATTERN: /^\:/
	},
	NAME: {
		ID: Symbol('variable name'),
		PATTERN: /^[A-Za-z][\d\w-_]*/ // Starts with a letter, and includes only letters, numbers from 0-9, dashes, and underscores
	},

}

class Token {
	constructor(type, value) {
		this.token_type = type;
		this.value = value;
	}
	represent() {
		if (this.value) {
			return this.ttype + this.value;
		}
	}
}

class Lexer {

	constructor (text) {
		this.text = text;
		this.position = -1;
		this.advance();
	}

	advance() {
		this.position += 1;
		if (this.position < this.text.length) {
			this.current_character = this.text[this.position];
		} else {
			this.current_character = null;
		}
	}

	make_tokens() {
		let tokens = [];
		let working_text = this.text;
		while (working_text) {
			let matched = false;
			for (let i in TOKEN_TYPES) {
				let match = working_text.match(TOKEN_TYPES[i].PATTERN)
				if (match) match = match[0]
				working_text = working_text.replace(match, '')
				if ( match ) {
					let matched = true;
					if ( TOKEN_TYPES[i].RESOLVE ) {
						tokens.push(TOKEN_TYPES[i].RESOLVE( match ))
					} else {
						//console.log(TOKEN_TYPES[i].ID)
						tokens.push(new Token(TOKEN_TYPES[i].ID));
					}
					// console.log(match)
					break;
				}
			}
			if (!matched) {
				// runs every time somehow
				//	console.log('token not allowed');
				//break;			
			}
		}
		return tokens;
	}
}

// RUN
function run(text) {
	let lexer = new Lexer(text);
	let tokens = lexer.make_tokens();
	console.log(tokens)
	
	return tokens;
}

run(prompt('Input:'));
