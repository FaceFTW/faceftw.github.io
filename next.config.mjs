import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeShiki from '@shikijs/rehype';
import rehypeShikiFromHighlighter from '@shikijs/rehype';
import { createdBundledHighlighter, createHighlighter, createHighlighterCoreSync } from 'shiki';
import rehypeHighlight from 'rehype-highlight';
// const highlighter = createHighlighterCoreSync({
//     themes: [import('shiki/themes/vitesse-light.mjs'), import('shiki/themes/vitesse-dark.mjs')],
//     langs: [import('shiki/langs/java.mjs'), import('shiki/langs/rust.mjs')],
//     loadWasm: import('shiki/wasm'),
//     engine: import('shiki/engine-oniguruma.mjs'),
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        rehypePlugins: [
            // rehypeShiki(
            //     {
            //         themes: {
            //             light: 'vitesse-light',
            //             dark: 'vitesse-dark',
            //         },
            //     }
            // ),
            rehypeHighlight,
        ],
    },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
