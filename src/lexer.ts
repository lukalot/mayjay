/**
 * Mayjay Lexer
 * written by Lukalot in Vim with love
 *
 * feel free to delete this headline if you wish, just keep the GPLv3 licence and all is good
 */

import { Token, TOKEN_TYPES, TokenType } from './tokens.ts';

// ---------- ERROR HANDLING ---------------
class LexerError extends Error {
	get name() {
		return this.constructor.name;
	}
}

class IllegalCharacterError extends LexerError {
	constructor(character: string) {
		super(`Illegal character "${character}"`);
	}
}

class InvalidSyntaxError extends LexerError {
	constructor(character: string) {
		super(`Invalid syntax "${character}"`);
	}
}

// ------------- LEXER ---------------

export class Lexer {
	public static tokenize(text: string): Token[] {
		let tokens = [];

		while (text) {
			let matched = false;

			for (let i in TOKEN_TYPES) {
				const type = TOKEN_TYPES[i] as TokenType;
				const matchingFragment = type.findMatch(text);

				if (matchingFragment !== null) {
					const token = new Token(type.id, type.normalize(matchingFragment));
					// remove the matched text from the text we're lexing
					text = text.replace(matchingFragment, '').trimStart();
					tokens.push(token);
					matched = true;
					break;
				}
			}

			if (!matched) {
				throw new IllegalCharacterError(text.charAt(0));
			}
		}
		return tokens;
	}
}
