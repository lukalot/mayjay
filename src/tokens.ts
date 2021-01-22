type TokenValue = Number | string;

export class Token {
	public readonly type: symbol;
	public readonly value: TokenValue;

	constructor(type: symbol, value: TokenValue) {
		this.type = type;
		this.value = value;
	}

	[Deno.customInspect](): string {
		return `${this.type.toString()} ${this.value}`;
	}
}

export class TokenType {
	constructor(
		public readonly id: symbol,
		private readonly matcher: string | RegExp,
		private readonly converter: (content: string) => any = (value) => value,
	) {
	}

	public findMatch(text: string): string | null {
		if (this.matcher instanceof RegExp) {
			const matches = this.matcher[Symbol.match](text);

			if (matches !== null) {
				return matches[0];
			}
		} else {
			if (text.startsWith(this.matcher)) {
				return this.matcher;
			}
		}

		return null;
	}

	public normalize(matchingFragment: string): any {
		return this.converter(matchingFragment);
	}
}

export const TOKEN_TYPES: { [id: string]: TokenType } = {
	TYPE_NUMBER: new TokenType(
		Symbol('NUMBER'),
		/^\d+(\.\d+)?/,
		(content) => Number(content),
	),
	TYPE_ADD: new TokenType(Symbol('ADD'), '+'),
	TYPE_NEGATE: new TokenType(Symbol('NEGATE'), '-'),
	TYPE_MULTIPLY: new TokenType(Symbol('MULTIPLY'), '*'),
	TYPE_DIVIDE: new TokenType(Symbol('DIVIDE'), '/'),
	TYPE_LEFT_PARENTHESES: new TokenType(Symbol('LEFT PARENTHESES'), '('),
	TYPE_RIGHT_PARENTHESES: new TokenType(Symbol('RIGHT PARENTHESES'), ')'),
	TYPE_END_LINE: new TokenType(Symbol('END LINE'), ','),
	TYPE_CONDITION: new TokenType(Symbol('CONDITION'), 'for'),
	TYPE_CHECK_DECLARATION: new TokenType(Symbol('CHECK DECLARATION'), 'check'),
	TYPE_EFFECT_DECLARATION: new TokenType(Symbol('EFFECT DECLARATION'), 'effect'),
	BLOCK_PRECEDENT: new TokenType(Symbol('BLOCK PRECEDENT'), ':'),
	COMMENT: new TokenType(Symbol('COMMENT'), /^#.*/),
	LOOP: new TokenType(Symbol('LOOP'), 'loop'),
	NAME: new TokenType(Symbol('NAME'), /^[A-Za-z][\d\w-_]*/),
};
