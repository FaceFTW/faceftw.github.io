import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

// https://vitejs.dev/config/
/**@type {import('vite'.UserConfig)} */
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                compact: true,
                // assetFileNames: (asset) => {
                //     if (
                //         asset.source.includes('/src/assets/markdown') &&
                //         ['png', 'jpg', 'webp', 'gif', 'svg'].findIndex(asset.name.split('.').pop()) !== -1
                //     ) {
                //     }
                //     return;
                // },
            },
        },
    },
});
