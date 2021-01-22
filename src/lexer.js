/**
 * Mayjay Lexer
 * written by Lukalot in Vim with love
 *
 * feel free to delete this headline if you wish, just keep the GPLv3 licence and all is good
 */

import { Token, TOKEN_TYPES } from './tokens.js';

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
