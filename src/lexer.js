/**
 * Mayjay Lexer
 * written by Lukalot in Vim with love
 *
 * feel free to delete this headline if you wish, just keep the GPLv3 licence and all is good
 */

// Run with deno ( deno run lexer.js )
import { TOKEN_TYPES } from './token_types.js'

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

class InvalidSyntaxError extends LexerError {
	constructor(character) {
		super(`Invalid syntax "${character}"`);
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

export class Lexer {
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
						tokens.push(new Token(TOKEN_TYPES[i].ID, match));
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
		console.log(this.token)
		return `${this.token.type}:${this.token.value}`;
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
