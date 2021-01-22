import { Lexer } from './src/lexer.js';
import { Parser } from './src/parser.js';

// Run with deno ( deno run mayjay.js )

function formatTokensToString(array) {
	let res = '';
	// and it will do so by doing a thing
	for (let item of array) {
		res = res + `${item.type.description}`;
		if (item.value) res = res + `:${item.value}`;
		res += '\n';
	}
	return res;
}

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
		console.error(error.stack);
	}
}
