import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { readFileSync } from 'node:fs';

main();

async function main() {
	const markdown = readFileSync("src/app/blog/")


    const file = await unified()
        .use(remarkParse) // Convert into markdown AST
        .use(remarkRehype) // Transform to HTML AST
        .use(rehypeSanitize) // Sanitize HTML input
        .use(rehypeStringify) // Convert AST into serialized HTML
        .process('Hello, Next.js!');

    console.log(String(file)); // <p>Hello, Next.js!</p>
}
