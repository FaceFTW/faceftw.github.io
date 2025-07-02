import { createHighlighter, getSingletonHighlighter } from 'shiki';

export default function ShikiPlugin(eleventyConfig, options) {
    // empty call to notify 11ty that we use this feature
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    eleventyConfig.amendLibrary('md', () => {});

    eleventyConfig.on('eleventy.before', async () => {
        const highlighter = await createHighlighter(options);
        eleventyConfig.amendLibrary('md', (mdLib) =>
            mdLib.set({
                highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
            })
        );
    });
}
