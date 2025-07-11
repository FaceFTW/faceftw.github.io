import { HtmlBasePlugin, IdAttributePlugin, InputPathToUrlTransformPlugin } from '@11ty/eleventy';
// import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginNavigation from '@11ty/eleventy-navigation';
import { fromHighlighter } from '@shikijs/markdown-it';
import { DateTime } from 'luxon';
import markdownItContainer from 'markdown-it-container';
import { createHighlighterCoreSync, createJavaScriptRegexEngine } from 'shiki';
import c from 'shiki/langs/c.mjs';
import csharp from 'shiki/langs/csharp.mjs';
import css from 'shiki/langs/css.mjs';
import html from 'shiki/langs/html.mjs';
import java from 'shiki/langs/java.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import perl from 'shiki/langs/perl.mjs';
import rust from 'shiki/langs/rust.mjs';
import shell from 'shiki/langs/shell.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import vitesse_dark from 'shiki/themes/vitesse-dark.mjs';
import vitesse_light from 'shiki/themes/vitesse-light.mjs';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
    /************************
     * Build Configuration
     ************************/
    eleventyConfig
        .addPassthroughCopy({
            './public/': '/',
            './src/assets/fonts': 'assets/fonts',
        })
        .addPassthroughCopy('./content/feed/pretty-atom-feed.xsl');

    eleventyConfig.addWatchTarget('**/*.css');
    eleventyConfig.addWatchTarget('**/*.{svg,webp,png,jpg,jpeg,gif}');

    /*************************
     * Markdown Configuration
     *************************/
    eleventyConfig.amendLibrary('md', (mdLib) => {
        const highlighter = createHighlighterCoreSync({
            themes: [vitesse_light, vitesse_dark],
            langs: [rust, java, perl, html, tsx, typescript, javascript, c, csharp, shell, css],
            engine: createJavaScriptRegexEngine(),
        });

        mdLib.use(
            fromHighlighter(highlighter, {
                themes: {
                    light: 'vitesse-light',
                    dark: 'vitesse-dark',
                },
            })
        );
    });
    eleventyConfig.amendLibrary('md', (mdLib) => {
        /**
         * Original Source is from:
         * https://github.com/kamranahmedse/markdown-it-class/
         * Using MIT License (Less packages the better)
         */
        function setTokenClasses(tokens, mapping = {}) {
            tokens.forEach((token) => {
                const isOpeningTag = token.nesting !== -1;
                if (isOpeningTag && mapping[token.tag]) {
                    const existingClasses = (token.attrGet('class') || '').split(' ');
                    const givenClasses = mapping[token.tag] || '';

                    const newClasses = [...existingClasses, ...givenClasses];

                    token.attrSet('class', newClasses.join(' ').trim());
                }

                if (token.children) {
                    setTokenClasses(token.children, mapping);
                }
            });
        }

        const mapping = {
            h1: ['text-3xl', 'xl:text-6xl', 'mb-4'],
            h2: ['text-2xl', 'xl:text-5xl', 'mb-4'],
            h3: ['text-xl', 'xl:text-4xl', 'mb-4'],
            h4: ['text-lg', 'xl:text-3xl', 'mb-4'],
            h5: ['text-md', 'xl:text-2xl', 'font-bold', 'mb-4'],
            h6: ['text-md', 'xl:text-xl', 'mb-4'],
            a: ['hover:underline', 'mb-4', 'leading-relaxed', 'text-primary'],
            ul: ['list-disc', 'list-outside', 'indent-4', 'ml-8', 'mb-4', 'leading-relaxed'],
            ol: ['list-decimal', 'list-outside', 'indent-4', 'ml-8', 'mb-4', 'leading-relaxed'],
            li: ['indent-4', 'leading-relaxed'],
            p: ['mb-4', 'leading-relaxed'],
            blockquote: [
                'border-l-8',
                'border-l-neutral-400',
                'dark:border-l-neutral-600',
                'border-spacing-16',
                'pl-4',
                'text-neutral-600',
                'dark:text-neutral-400',
                'leading-relaxed',
            ],
            hr: ['mb-4'],
            table: ['table-auto', 'mx-auto', 'mb-4'],
            figcaption: ['mb-4', 'italic'],
        };

        mdLib.use((md) => {
            md.core.ruler.push('markdownit-tag-class', (state) => {
                setTokenClasses(state.tokens, mapping);
            });
        });
    });
    eleventyConfig.amendLibrary('md', (/** @type {MarkdownIt}*/ mdLib) => {
        mdLib.use(markdownItContainer, 'image', {
            render: (/** @type {import('markdown-it').Token[]}*/ tokens, idx) => {
                //Using the <figure> tags, so we can easily add opening/closing tags as needed
                if (tokens[idx].nesting === 1) {
                    return '<figure class="flex flex-col items-center text-center mb-4">';
                }
                if (tokens[idx].nesting === -1) {
                    return '</figure>';
                }

                console.log(`${tokens[idx]}`);
            },
        });
    });

    /************************
     * Plugin Setup
     ************************/
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(HtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(IdAttributePlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        formats: ['avif', 'webp', 'auto'],
        failOnError: false,
        htmlOptions: {
            imgAttributes: {
                loading: 'lazy',
                decoding: 'async',
            },
        },
        sharpOptions: {
            animated: true,
        },
    });

    // eleventyConfig.addPlugin(feedPlugin, {
    // 	type: "atom", // or "rss", "json"
    // 	outputPath: "/feed/feed.xml",
    // 	stylesheet: "pretty-atom-feed.xsl",
    // 	templateData: {
    // 		eleventyNavigation: {
    // 			key: "Feed",
    // 			order: 4
    // 		}
    // 	},
    // 	collection: {
    // 		name: "posts",
    // 		limit: 10,
    // 	},
    // 	metadata: {
    // 		language: "en",
    // 		title: "Blog Title",
    // 		subtitle: "This is a longer description about your blog.",
    // 		base: "https://example.com/",
    // 		author: {
    // 			name: "Your Name"
    // 		}
    // 	}
    // });

    /************************
     * Custom Filters
     ************************/
    eleventyConfig.addFilter('prettyDate', (value) => {
        const date = DateTime.fromISO(value);
        return date.toFormat('MMMM d, yyyy');
    });
}

export const config = {
    templateFormats: ['md', 'njk', '11ty.js'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
        input: 'src', // default: "."
        includes: '_includes', // default: "_includes" (`input` relative)
        data: '_data', // default: "_data" (`input` relative)
        output: 'dist',
    },
};
