import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve as resolveFile } from 'node:path';
import { HtmlBasePlugin, IdAttributePlugin, InputPathToUrlTransformPlugin } from '@11ty/eleventy';
// import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginNavigation from '@11ty/eleventy-navigation';
import tailwindcss from '@tailwindcss/postcss';
import CleanCSS from 'clean-css';
import htmlmin from 'html-minifier-terser';
import { DateTime } from 'luxon';
import postcss from 'postcss/lib/postcss';
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
     * Tailwind on Build
     ************************/
    eleventyConfig.on('eleventy.before', async () => {
        const tailwindInputPath = resolveFile('./src/main.css');
        const tailwindOutputPath = './src/_includes/compiled.css';
        const cssContent = readFileSync(tailwindInputPath, 'utf8');
        const outputDir = dirname(tailwindOutputPath);

        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
        }

        const result = await postcss([tailwindcss()])
            .process(cssContent, {
                from: tailwindInputPath,
                to: tailwindOutputPath,
            })
            .then((val) => {
                return new CleanCSS().minify(val.css).styles;
            });

		//HACK, Inlining via Global Data seems to truncate results
		//So use Nunjucks include with the file instead
        writeFileSync(tailwindOutputPath, result);
    });

    /************************
     * Build Configuration
     ************************/
    eleventyConfig
        .addPassthroughCopy({
            './public/': '/',
            './src/assets/fonts': 'assets/fonts',
            './src/assets/pfp.webp': 'assets/pfp.webp',
            './src/assets/thumbs': 'assets/thumbs',
        })
        .addPassthroughCopy('./content/feed/pretty-atom-feed.xsl');

    eleventyConfig.addWatchTarget('**/*.css');
    eleventyConfig.addWatchTarget('**/*.{svg,webp,png,jpg,jpeg,gif}');

    eleventyConfig.addTransform('minify', function (content) {
        if ((this.page.outputPath || '').endsWith('.html')) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifiyCSS: true,
                sortClassName: true,
            });
        }
        return content;
    });
    /*************************
     * Markdown Configuration
     *************************/
    //Make a singleton Shiki Highlighter
    const highlighter = createHighlighterCoreSync({
        themes: [vitesse_light, vitesse_dark],
        langs: [rust, java, perl, html, tsx, typescript, javascript, c, csharp, shell, css],
        engine: createJavaScriptRegexEngine(),
    });
    const langs = highlighter.getLoadedLanguages();

    //Modified fence renderer to "shortcut" if the "info" is image
    //Also skips a bunch of unnecessary checks to match my highlighting needs
    //Otherwise identical to original markdown-it
    eleventyConfig.amendLibrary('md', (/** @type {MarkdownIt}*/ mdLib) => {
        // biome-ignore lint/style/useDefaultParameterLast: Based on Shiki Official Package Code
        const highlight = (code, lang = 'text', attrs) => {
            const blockLang = lang === '' || !langs.includes(lang) ? 'text' : lang;
            const codeOptions = { lang: blockLang, meta: { __raw: attrs } };
            const codeToHighlight = code.endsWith('\n') ? code.slice(0, -1) : code;

            return highlighter.codeToHtml(codeToHighlight, {
                themes: {
                    light: 'vitesse-light',
                    dark: 'vitesse-dark',
                },
                ...codeOptions,
                transformers: [
                    {
                        name: '@shikijs/markdown-it:block-class',
                        code(node) {
                            node.properties.class = `language-${lang}`;
                        },
                    },
                    ...(codeOptions.transformers || []),
                ],
            });
        };

        //Override the default render rule (irrevocably)
        mdLib.renderer.rules.fence = function (tokens, idx, _options, _env, slf) {
            const token = tokens[idx];
            const info = token.info ? mdLib.utils.unescapeAll(token.info).trim() : '';
            let fenceName = '';
            let fenceAttrs = '';

            if (info) {
                const arr = info.split(/(\s+)/g);
                fenceName = arr[0];
                fenceAttrs = arr.slice(2).join('');
            }

            if (fenceName === 'image') {
                const imgDetails = /src="(.*)",\s*([0-9]+)x([0-9]+)\n(.*)\n/.exec(token.content);
                const imgSrc = imgDetails[1];
                const imgWidth = imgDetails[2];
                const imgHeight = imgDetails[3];
                const imgCaption = imgDetails[4];

                return `<figure class="flex flex-col items-center text-center mb-4">
                    <img src="${imgSrc}" ${slf.renderAttrs(token)} alt="${imgCaption}" width="${imgWidth}" height="${imgHeight}">
                    <figcaption>${imgCaption}</figcaption>
                </figure>`;
            }

            const highlighted = highlight(token.content, fenceName, fenceAttrs);
            if (highlighted.indexOf('<pre') === 0) {
                return `${highlighted}\n`;
            }

            return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>\n`;
        };
    });
    eleventyConfig.amendLibrary('md', (mdLib) => {
        /**
         * Based on https://github.com/kamranahmedse/markdown-it-class/
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
            a: ['hover:underline', 'leading-relaxed', 'text-primary'],
            ul: ['list-outside', 'leading-relaxed'],
            ol: ['list-outside', 'leading-relaxed'],
            p: ['leading-relaxed'],
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
        };

        mdLib.use((md) => {
            md.core.ruler.push('markdownit-tag-class', (state) => {
                setTokenClasses(state.tokens, mapping);
            });
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
        formats: ['webp', 'jpeg'],
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
     * Custom Filters + Collections
     ************************/
    eleventyConfig.addFilter('prettyDate', (value) => {
        const date = DateTime.fromISO(value);
        return date.toFormat('MMMM d, yyyy');
    });

    eleventyConfig.addCollection('blogSorted', (collectionsApi) => {
        return collectionsApi.getFilteredByTag('posts').sort((a, b) => {
            return b.date - a.date;
        });
    });

    eleventyConfig.addCollection('recentPosts', (collectionsApi) => {
        return collectionsApi
            .getFilteredByTag('posts')
            .sort((a, b) => {
                return b.date - a.date;
            })
            .slice(0, 3);
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
