import { Lexer } from './src/lexer.ts';
import { Parser } from './src/parser.js';

// Run with deno ( deno run mayjay.js )

// -------------- RUN ----------------
function run(text) {
	const tokens = Lexer.tokenize(text);

	// Abstract syntax tree time
	const parser = new Parser(tokens);
	const tree = parser.parse();

	console.log();
	console.log(tokens);
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
		console.error(error.stack);
	}
}
