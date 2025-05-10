import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { Metadata } from 'next';
import FormattedDate from '@/components/date';
import { parseISO } from 'date-fns';

//NOTE: We expect import errors since TS LSP can't figure out the MDX Frontmatter exports which do exist
//@ts-expect-error
import { frontmatter as frontmatter1 } from '@/app/blog/(posts)/0001/page.mdx';
//@ts-expect-error
import { frontmatter as frontmatter2 } from '@/app/blog/(posts)/0002/page.mdx';
//@ts-expect-error
import { frontmatter as frontmatter3 } from '@/app/blog/(posts)/0003/page.mdx';
//@ts-expect-error
import { frontmatter as frontmatter4 } from '@/app/blog/(posts)/0004/page.mdx';
//@ts-expect-error
import { frontmatter as frontmatter5 } from '@/app/blog/(posts)/0005/page.mdx';
//@ts-expect-error
import { frontmatter as frontmatter6 } from '@/app/blog/(posts)/0006/page.mdx';
//@ts-expect-error
import { frontmatter as frontmatter7 } from '@/app/blog/(posts)/0007/page.mdx';
//@ts-expect-error
import { frontmatter as frontmatter8 } from '@/app/blog/(posts)/0008/page.mdx';

const cc_xmlns = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
};

export default function Index() {
    const allPosts = [
        frontmatter1,
        frontmatter2,
        frontmatter3,
        frontmatter4,
        frontmatter5,
        frontmatter6,
        frontmatter7,
        frontmatter8,
    ].sort((a, b) => (parseISO(a.date) > parseISO(b.date) ? -1 : 1));

    return (
        <main>
            <div className='container mx-auto px-5'>
                <h1 className='mt-4 text-4xl'>
                    <pre>ref_cycle</pre>
                </h1>
                <h2 className='mt-2 mb-4 text-2xl text-neutral-600 dark:text-neutral-400'>
                    AKA: Core Dumping my Brain on the Internet
                </h2>
                <p className='prose prose-green dark:prose-invert inline-flex lg:flex' {...cc_xmlns}>
                    <span property='dct:title' className='mr-1'>
                        ref_cycle{' '}
                    </span>{' '}
                    is licensed under{' '}
                    <a
                        href='https://creativecommons.org/licenses/by-nc-sa/4.0'
                        target='_blank'
                        rel='license noopener noreferrer'
                        className='ml-1 inline'>
                        CC BY-NC-SA 4.0
                    </a>
                </p>

                {allPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.title}>
                        <Card className='my-4'>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>
                                    <FormattedDate dateString={post.date} />
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{post.excerpt}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export const metadata: Metadata = {
    title: "Blog - Alex's Website",
};
