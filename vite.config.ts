import { defineConfig } from 'vite';
// import type {OutputOptions} from 'vite'
import Inspect from 'vite-plugin-inspect';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import fs from 'node:fs/promises';

//This is a "post-build" plugin to change the URLs of images in Markdown files
//to the bundled equivalent after Vite transforms the output, THEN rehashes the file
//to match the conventions produced by Vite/Rollup
//
//This feels like it could be done within the lifecycle of the build process but I'd
//rather not waste brain cells trying to understand Javascript compilation processes

const postProcessMarkdownLinks = () => {
    return {
        name: 'rollup-plugin-post-process-markdown-links',
        closeBundle: (): Promise<void> => {
            fs.opendir('dist/assets').then((dir) => {
                dir.read().then((ent) => {
                    if (ent.name.endsWith('.md')) {
                        fs.readFile(`${ent.parentPath}/${ent.name}`).then((buffer) => {
                            const updated = buffer.toString().replace('/assets', '');
                            fs.writeFile(`${ent.parentPath}/${ent.name}`, updated).then(() => {
                                return;
                            });
                        });
                    }
                });
            });
            return Promise.resolve();
        },
    };
};

// https://vitejs.dev/config/
/**@type {import('vite'.UserConfig)} */
export default defineConfig({
    plugins: [
        react(),
        Inspect({
            build: true,
            outputDir: '.vite-inspect',
        }),
        postProcessMarkdownLinks(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                compact: true,
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
});
