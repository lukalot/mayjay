import { TOKEN_TYPES } from './tokens.ts';

class NumberNode {
	constructor(token) {
		this.token = token;
	}

	[Deno.customInspect]() {
		return `${this.token.type.toString()}:${this.token.value}`;
	}
}

class BinaryOperationNode {
	constructor(left_node, operation_token, right_node) {
		this.left_node = left_node;
		this.operation_token = operation_token;
		this.right_node = right_node;
	}

	[Deno.customInspect]() {
		return `(${this.left_node}, ${this.operation_token}, ${this.right_node})`
	}
}

export class Parser {
	constructor(tokens) {
		this.tokens = tokens;
		this.index = 0;
		this.current_token = this.tokens[this.index];
	}

	advance() {
		this.index += 1;
		if (this.index < this.tokens.length) {
			this.current_token = this.tokens[this.index];
		}
		return this.current_token;
	}

	parse() {
		let res = this.expression();
		return res;
	}

	binaryOperation(inputFunction, operations) {
		let left = inputFunction();

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
		if (token.type === TOKEN_TYPES.TYPE_NUMBER.id) {
			this.advance();
			return new NumberNode(token);
		}
	}

	term() {
		return this.binaryOperation(this.factor.bind(this), [TOKEN_TYPES.TYPE_MULTIPLY.id, TOKEN_TYPES.TYPE_DIVIDE.id]);
	}

	expression() {
		return this.binaryOperation(this.term.bind(this), [TOKEN_TYPES.TYPE_ADD.id, TOKEN_TYPES.TYPE_NEGATE.id]);
	}
}
