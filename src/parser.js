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
		if (token.type === TOKEN_TYPES.TYPE_NUMBER.ID) {
			this.advance();
			return new NumberNode(token);
		}
	}

	term() {
		return this.binaryOperation(this.factor.bind(this), [TOKEN_TYPES.TYPE_MULTIPLY.ID, TOKEN_TYPES.TYPE_DIVIDE.ID]);
	}

	expression() {
		return this.binaryOperation(this.term.bind(this), [TOKEN_TYPES.TYPE_ADD.ID, TOKEN_TYPES.TYPE_NEGATE.ID]);
	}
}