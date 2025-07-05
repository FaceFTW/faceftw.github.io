import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from '@11ty/eleventy';
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
    eleventyConfig.addBundle('css', {
        toFileDirectory: 'dist',
        // Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
        // Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
        bundleHtmlContentFromSelector: 'style',
    });

    // Official plugins
    // eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    // 	preAttributes: { tabindex: 0 }
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

    eleventyConfig.amendLibrary('md', (mdLib) => {
        mdLib.use(mdItClass, {
            h1: ['text-3xl', 'xl:text-6xl', 'mb-4'],
            h2: ['text-2xl', 'xl:text-5xl', 'mb-4'],
            h3: ['text-xl', 'xl:text-4xl', 'mb-4'],
            h4: ['text-lg', 'xl:text-3xl', 'mb-4'],
            h5: ['text-md', 'xl:text-2xl', 'font-bold', 'mb-4'],
            h6: ['text-md', 'xl:text-xl', 'mb-4'],
            a: ['hover:underline', 'mb-4', 'leading-relaxed'],
            ul: ['list-outside', 'indent-4', 'ml-8', 'mb-4', 'leading-relaxed'],
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
        });
    });

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

    // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // Output formats for each image.
        formats: ['avif', 'webp', 'auto'],

        // widths: ["auto"],

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

    // Filters
    // eleventyConfig.addPlugin(pluginFilters);

    eleventyConfig.addPlugin(IdAttributePlugin, {
        // by default we use Eleventy’s built-in `slugify` filter:
        // slugify: eleventyConfig.getFilter("slugify"),
        // selector: "h1,h2,h3,h4,h5,h6", // default
    });

    eleventyConfig.addShortcode('currentBuildDate', () => {
        return new Date().toISOString();
    });

    // Features to make your build faster (when you need them)

    // If your passthrough copy gets heavy and cumbersome, add this line
    // to emulate the file copy on the dev server. Learn more:
    // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

    // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
}

export const config = {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // These are all optional:
    dir: {
        input: 'src', // default: "."
        includes: '_includes', // default: "_includes" (`input` relative)
        data: '_data', // default: "_data" (`input` relative)

        output: 'dist',
    },

    // -----------------------------------------------------------------
    // Optional items:
    // -----------------------------------------------------------------

    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

    // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
    // it will transform any absolute URLs in your HTML to include this
    // folder name and does **not** affect where things go in the output folder.

    // pathPrefix: "/",
};
