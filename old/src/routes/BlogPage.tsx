import type { BlogPost } from '@/DataTypes';
import blogData from '../assets/markdown/blog_list.json';
import { Link, useParams } from 'wouter';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LucideArrowLeft } from 'lucide-react';

const MarkdownRender = React.lazy(() =>
    import('@/components/MarkdownRender').then((module) => ({ default: module.MarkdownRender }))
);

const LIST: BlogPost[] = blogData.sort((a, b) => {
    return Number.parseInt(a.index) - Number.parseInt(b.index);
});

export const BlogPagePanel = () => {
    const params = useParams();
    const metadata = LIST.find((post) => Number.parseInt(params.postId ?? '-1') === Number.parseInt(post.index));
    const markdownUrl = new URL(`../assets/markdown/${metadata ? metadata.markdown : 'NotFound.md'}`, import.meta.url)
        .href;

    const [markdownData, setMarkdownData] = React.useState('');

    React.useEffect(() => {
        fetch(markdownUrl).then((res) => {
            res.text().then((val) => setMarkdownData(val));
        });
    }, [markdownUrl]);

    return (
        <div className='mx-4 my-4 lg:mx-16'>
            <div className='flex flex-row space-x-2'>
                <Link to='/blog'>
                    <div className='flex flex-row space-x-2'>
                        <LucideArrowLeft className='text-neutral-600 dark:text-neutral-500' />
                        <p className='text-neutral-600 dark:text-neutral-500'>Back to the Main Page</p>
                    </div>
                </Link>
            </div>

            <React.Suspense
                fallback={
                    <>
                        <Skeleton />
                        <Skeleton />
                    </>
                }>
                <MarkdownRender>{markdownData}</MarkdownRender>
            </React.Suspense>
        </div>
    );
};
