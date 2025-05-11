import type React from 'react';

import '@/lib/highlight-theme.css';
import Link from 'next/link';
import { LucideArrowLeft } from 'lucide-react';

const cc_xmlns = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
};

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
        <div className='flex flex-col justify-center'>
            <div className='mb-4 flex flex-row'>
                <Link href='/blog'>
                    <div className='flex flex-row space-x-2'>
                        <LucideArrowLeft className='text-neutral-600 dark:text-neutral-500' />
                        <p className='text-neutral-600 dark:text-neutral-500'>Back to the Main Page</p>
                    </div>
                </Link>
            </div>
            <article className='prose prose-green dark:prose-invert block grow lg:max-w-[125ch]'>{children}</article>
            <br />
            <em className='prose prose-green dark:prose-invert mb-8 inline-flex self-center lg:flex' {...cc_xmlns}>
                <span property='dct:title' className='mr-1'>
                    This post of ref_cycle{' '}
                </span>{' '}
                is licensed under{' '}
                <a
                    href='https://creativecommons.org/licenses/by-nc-sa/4.0'
                    target='_blank'
                    rel='license noopener noreferrer'
                    className='ml-1 inline'>
                    CC BY-NC-SA 4.0
                </a>
            </em>
        </div>
    );
}
