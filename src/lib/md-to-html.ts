import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkGfm).use(remarkRehype).use(rehypeShiki, {
	themes: {
		light: 'vitesse-light',
		dark: 'vitesse-dark'
	}
  }).use(rehypeStringify).process(markdown);
  return result.toString();
}