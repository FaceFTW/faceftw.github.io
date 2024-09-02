import type { BlogPost } from '@/DataTypes';
import blogData from '../assets/markdown/blog_list.json';
import { useParams } from 'wouter';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MarkdownRender = React.lazy(() =>
    import('@/components/MarkdownRender').then((module) => ({ default: module.MarkdownRender }))
);

const LIST: BlogPost[] = blogData.sort((a, b) => {
    return Number.parseInt(a.index) - Number.parseInt(b.index);
});

export const BlogPagePanel = () => {
    // const blogPageInfo: BlogPost = useLoaderData() as BlogPost;
    const params = useParams();
    const blogIndex = Number.parseInt(params.postId as string) - 1;
    const metadata = LIST[blogIndex];
    const markdownUrl = new URL(`../assets/markdown/${metadata.markdown}`, import.meta.url).href;

    const [markdownData, setMarkdownData] = React.useState('');

    React.useEffect(() => {
        fetch(markdownUrl).then((res) => {
            res.text().then((val) => setMarkdownData(val));
        });
    }, [markdownUrl]);

    return (
        <div className='mx-16 my-4'>
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
