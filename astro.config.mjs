// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            noExternal: ['tw-animate-css'],
        },
    },

    integrations: [mdx(), react()],
});
