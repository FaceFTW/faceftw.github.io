import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import withPlugins from 'next-compose-plugins';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
            [
                rehypeShiki,
                {
                    themes: {
                        light: 'vitesse-light',
                        dark: 'vitesse-dark',
                    },
                },
            ],
			// rehypeStringify
        ],
    },
});

export default withPlugins(
    [[withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true', openAnalyzer: false })], [withMDX]],
    nextConfig
);
