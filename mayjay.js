
import { Lexer } from './src/lexer.js'
import { Parser } from './src/parser.js'


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