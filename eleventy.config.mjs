import { HtmlBasePlugin, IdAttributePlugin, InputPathToUrlTransformPlugin } from '@11ty/eleventy';
// import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginNavigation from '@11ty/eleventy-navigation';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import mdItClass from './src/libs/mdItClass.mjs';
import { fromHighlighter } from '@shikijs/markdown-it';
import { createHighlighterCoreSync, createJavaScriptRegexEngine } from 'shiki';
import rust from '@shikijs/langs/rust';
import java from '@shikijs/langs/java';
import perl from '@shikijs/langs/perl';
import html from '@shikijs/langs/html';
import tsx from '@shikijs/langs/tsx';
import javascript from '@shikijs/langs/javascript';
import typescript from '@shikijs/langs/typescript';
import c from '@shikijs/langs/c';
import css from '@shikijs/langs/css';
import csharp from '@shikijs/langs/csharp';
import shell from '@shikijs/langs/shell';
import vitesse_light from '@shikijs/themes/vitesse-light';
import vitesse_dark from '@shikijs/themes/vitesse-dark';
import { DateTime } from 'luxon';
import MarkdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
    // Drafts, see also _data/eleventyDataSchema.js
    // eleventyConfig.addPreprocessor('drafts', '*', (data, content) => {
    //     if (data.draft && process.env.ELEVENTY_RUN_MODE === 'build') {
    //         return false;
    //     }
    // });

    eleventyConfig
        .addPassthroughCopy({
            './public/': '/',
            './src/assets/fonts': 'assets/fonts',
        })
        .addPassthroughCopy('./content/feed/pretty-atom-feed.xsl');

    // Run Eleventy when these files change:
    // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

    eleventyConfig.addWatchTarget('**/*.css');
    eleventyConfig.addWatchTarget('**/*.{svg,webp,png,jpg,jpeg,gif}');

    // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
    // Bundle <style> content and adds a {% css %} paired shortcode
    // eleventyConfig.addBundle('css', {
    //     toFileDirectory: 'dist',
    //     // Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
    //     // Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
    //     bundleHtmlContentFromSelector: 'style',
    // });

    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(HtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

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
    eleventyConfig.setLibrary(
        'md',
        MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
        })
    );
    eleventyConfig.amendLibrary('md', (mdLib) => {
        //Initialize the Shiki Highliher
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
        mdLib.use(mdItClass, {
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
            code: ['rounded-lg', 'px-1', 'py-0.5', 'mb-4'],
            pre: [
                'mb-4',
                'rounded-lg',
                'border-l-8',
                'border-l-neutral-400',
                'dark:border-l-neutral-600',
                'border-spacing-16',
                'pl-4',
                'text-neutral-600',
                'dark:text-neutral-400',
                'leading-relaxed',
            ],
            figcaption: ['mb-4', 'italic'],
        });
    });
    eleventyConfig.amendLibrary('md', (/** @type {MarkdownIt}*/ mdLib) => {
        mdLib.use(markdownItContainer, 'image', {
			render: (/** @type {import('markdown-it').Token[]}*/ tokens, idx) => {
				//Using the <figure> tags, so we can easily add opening/closing tags as needed
				if (tokens[idx].nesting === 1){
					return "<figure class=\"flex items-center text-center mb-4\">"
				}
				if (tokens[idx].nesting===-1){
					return "</figure>"
				}

				//really stupid system using regexes. But shaddup it work :p
				// let imgMatch = tokens[idx].
			},
        });
    });

    // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // Output formats for each image.
        formats: ['avif', 'webp', 'auto'],
        failOnError: false,
        htmlOptions: {
            imgAttributes: {
                // e.g. <img loading decoding> assigned on the HTML tag will override these values.
                loading: 'lazy',
                decoding: 'async',
            },
        },
        sharpOptions: {
            animated: true,
        },
    });

    eleventyConfig.addPlugin(IdAttributePlugin, {
        // by default we use Eleventy’s built-in `slugify` filter:
        // slugify: eleventyConfig.getFilter("slugify"),
        // selector: "h1,h2,h3,h4,h5,h6", // default
    });

    eleventyConfig.addShortcode('currentBuildDate', () => {
        return new Date().toISOString();
    });

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
