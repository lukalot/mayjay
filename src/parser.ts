import { Token, TOKEN_TYPES } from './tokens.ts';

interface Node {
}

class NumberNode implements Node {
	constructor(private readonly token: Token) {
	}

	toString(): string {
		return this.token.toString();
	}

	[Deno.customInspect](): string {
		return this.toString();
	}
}

class BinaryOperationNode implements Node {
	constructor(
		private readonly left_node: Node,
		private readonly operation_token: Token,
		private readonly right_node: Node,
	) {
	}

	toString(): string {
		return `(${this.left_node.toString()}, ${this.operation_token.toString()}, ${this.right_node.toString()})`;
	}

	[Deno.customInspect](): string {
		return this.toString();
	}
}

export class Parser {
	private readonly tokens: Token[];
	private index: number;
	private current_token: Token;

	constructor(tokens: Token[]) {
		this.tokens = tokens;
		this.index = 0;
		this.current_token = this.tokens[this.index];
	}

	public parse(): Node | null {
		if (this.tokens.length > 0) {
			return this.expression();
		}

		return null;
	}

	private expression(): Node {
		return this.binaryOperation(this.term.bind(this), [TOKEN_TYPES.TYPE_ADD.id, TOKEN_TYPES.TYPE_NEGATE.id]);
	}

	private term(): Node {
		return this.binaryOperation(this.factor.bind(this), [TOKEN_TYPES.TYPE_MULTIPLY.id, TOKEN_TYPES.TYPE_DIVIDE.id]);
	}

	private factor(): Node {
		const token = this.next();

		if (!token) {
			throw new SyntaxError(`No more tokens`);
		} else if (token.type === TOKEN_TYPES.TYPE_NUMBER.id) {
			return new NumberNode(token);
		} else {
			throw new SyntaxError(`Unsupported token: ${token.type.description}`);
		}
	}

	private binaryOperation(inputFunction: () => Node, operations: symbol[]): Node {
		let left = inputFunction();
		let operation;

		while (operation = this.next()) {
			if (operations.indexOf(operation.type) === -1) {
				break;
			}

			let right = inputFunction();
			left = new BinaryOperationNode(left, operation, right);
		}
		return left;
	}

	private next(): Token | null {
		return this.tokens[this.index++] ?? null;
	}
}
