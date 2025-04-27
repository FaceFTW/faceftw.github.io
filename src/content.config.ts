import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/blog' }),
});

// const profile = defineCollection({
//     loader: file(''),
// });

export const collections = { blog };
